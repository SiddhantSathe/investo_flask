from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import re
from pymongo import MongoClient
from dotenv import load_dotenv  
load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("GEMINI_API_KEY")


if not API_KEY:
    raise ValueError("API Key is missing! Please set GOOGLE_API_KEY in the .env file.")

genai.configure(api_key=API_KEY)

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)


def save_uploaded_file(file):
    """Save uploaded file temporarily and return the path."""
    file_path = os.path.join(TEMP_DIR, file.filename)
    file.save(file_path)
    return file_path

def extract_text_from_image(image_path):
    """Extract full text from image using Gemini AI."""
    sample_file = genai.upload_file(path=image_path, display_name="UploadedImage")
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    response = model.generate_content([sample_file, "Extract all text from this document."])
    return response.text.strip()

def is_valid_document(full_text, doc_type):
    """Checks if the extracted text matches PAN or Aadhaar document format."""
    pan_keywords = ["permanent account number", "income tax department"]
    aadhaar_keywords = ["unique identification authority", "government of india", "aadhaar"]

    full_text = full_text.lower()

    if doc_type == "pan" and any(keyword in full_text for keyword in pan_keywords):
        return True
    if doc_type == "aadhaar" and any(keyword in full_text for keyword in aadhaar_keywords):
        return True
    return False

def clean_name(name):
    """Clean and standardize extracted names."""
    return re.sub(r'\s+', ' ', name.strip().lower())

@app.route('/verify-documents', methods=['POST'])
def verify_documents():
    if 'pan_card' not in request.files or 'aadhaar_card' not in request.files:
        return jsonify({"error": "PAN and Aadhaar documents required"}), 400

    pan_card = request.files['pan_card']
    aadhaar_card = request.files['aadhaar_card']
    entered_name = request.form.get('username', '').strip()

    if not entered_name:
        return jsonify({"error": "Username is required"}), 400

    try:
        pan_path = save_uploaded_file(pan_card)
        aadhaar_path = save_uploaded_file(aadhaar_card)


        extracted_pan_text = extract_text_from_image(pan_path)
        extracted_aadhaar_text = extract_text_from_image(aadhaar_path)
        if not is_valid_document(extracted_pan_text, "pan"):
            os.remove(pan_path)
            os.remove(aadhaar_path)
            return jsonify({"status": "failed", "reason": "Invalid PAN document"}), 400

        if not is_valid_document(extracted_aadhaar_text, "aadhaar"):
            os.remove(pan_path)
            os.remove(aadhaar_path)
            return jsonify({"status": "failed", "reason": "Invalid Aadhaar document"}), 400
        extracted_pan_name = clean_name(extracted_pan_text)
        extracted_aadhaar_name = clean_name(extracted_aadhaar_text)
        entered_name = clean_name(entered_name)

        from fuzzywuzzy import fuzz
        pan_similarity = fuzz.token_set_ratio(entered_name, extracted_pan_name)
        aadhaar_similarity = fuzz.token_set_ratio(entered_name, extracted_aadhaar_name)

        print("PAN Similarity:", pan_similarity)
        print("Aadhaar Similarity:", aadhaar_similarity)

        os.remove(pan_path)
        os.remove(aadhaar_path)

        if pan_similarity >= 80 and aadhaar_similarity >= 80:
            return jsonify({"status": "verified"}), 200
        else:
            return jsonify({"status": "failed", "reason": "Name mismatch"}), 400

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["Cluster0"]  # Ensure this matches your database name
collection = db["insurance_policies"]
@app.route("/api/insurance", methods=["GET"])
def get_insurance():
    policies = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB _id field
    return jsonify(policies)


if __name__ == '__main__':
    app.run(debug=True, port=5500)






