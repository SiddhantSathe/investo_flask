from pymongo import MongoClient
import os
# Load environment variables
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client["Cluster0"]
collection = db["insurance_policies"] 

def get_insurance_data():
    try:
        # Fetch all documents from the insurance collection
        insurance_data = list(collection.find())
        
        # Convert ObjectId to string for JSON serialization
        for item in insurance_data:
            item['_id'] = str(item['_id'])
        
        return insurance_data
    
    except Exception as e:
        print(f"Error fetching insurance data: {e}")
        return []  # Return an empty list on error
    
# print(get_insurance_data())