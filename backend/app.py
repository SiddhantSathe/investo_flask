from flask import Flask, request, jsonify
from flask_cors import CORS
from api.gemini import generate

app = Flask(__name__)
CORS(app , supports_credentials=True, resources={r"/*": {"origins": "*"}})



@app.route("/suggestion", methods=["GET"])
def suggestion():
    budget = request.args.get("budget")
    risk = request.args.get("risk")
    print('suggestion route hit')

    try:
        prompt = f"""I am building a stock recommendation system that takes user inputs such as budget {budget} and risk ability {risk} to suggest stocks. Analyze stocks based on:

#     User Inputs: Investment budget, risk tolerance (low, medium, high), and investment type (growth, value, dividend, momentum).
#     Fundamental Analysis: EPS, P/E ratio, ROE, Revenue Growth, Debt-to-Equity, Free Cash Flow.
#     Technical Analysis: RSI, MACD, Moving Averages (50-day, 200-day), Bollinger Bands, Trading Volume.
#     Market Sentiment: Recent news, social media trends, institutional holdings.
#     Based on the users budget and risk profile, suggest 3-5 stocks. Categorize them as safe (low volatility), balanced (moderate risk-reward), and high-risk (growth/momentum). Provide reasoning for each recommendation and use real stock name. dont explain the technical analysis in detail, just mention the indicators used and the conclusion. keep it simple and concise within 200 words."""

        sug = generate(prompt)

        return jsonify({
            "recommendations": sug,
            "userProfile": {"budget": budget, "risk": risk},
            "importantNote": "this is just a ai generated recommendation."
        })
        
        # # Return mock data structure that matches what frontend expects
        # return jsonify({
        #     "recommendations": [
        #         {
        #             "name": "Apple Inc. (AAPL)",
        #             "category": "balanced",
        #             "reasoning": "Strong market position with reliable fundamentals. Positive technical indicators with good support levels."
        #         },
        #         {
        #             "name": "Microsoft Corporation (MSFT)",
        #             "category": "safe",
        #             "reasoning": "Consistent dividend growth with diversified revenue streams. Technical indicators show stable performance."
        #         },
        #         {
        #             "name": "NVIDIA Corporation (NVDA)",
        #             "category": "high-risk",
        #             "reasoning": "High growth potential in AI sector. Momentum indicators strong but higher volatility expected."
        #         }
        #     ],
        #     "userProfile": {"budget": budget, "risk": risk},
        #     "importantNote": "This is sample data. Real API is rate limited."
        # })
        
    except Exception as e:
        # Log the error
        print(f"Error generating suggestion: {str(e)}")
        
        # Return a proper error response
        return jsonify({
            "error": "Failed to generate suggestions",
            "recommendations": [],
            "userProfile": {"budget": budget, "risk": risk}
        }), 500
    
# @app.route("/suggestion", methods=["GET"])
# def suggestion():
#     # data = request.json
#     # budget = data["budget"]
#     # risk = data["risk"]
        
#     budget = request.args.get("budget")
#     risk = request.args.get("risk")
#     print('suggestion route hit')

#     prompt = f"""I am building a stock recommendation system that takes user inputs such as budget {budget} and risk ability {risk} to suggest stocks. Analyze stocks based on:

# #     User Inputs: Investment budget, risk tolerance (low, medium, high), and investment type (growth, value, dividend, momentum).
# #     Fundamental Analysis: EPS, P/E ratio, ROE, Revenue Growth, Debt-to-Equity, Free Cash Flow.
# #     Technical Analysis: RSI, MACD, Moving Averages (50-day, 200-day), Bollinger Bands, Trading Volume.
# #     Market Sentiment: Recent news, social media trends, institutional holdings.
# #     Based on the users budget and risk profile, suggest 3-5 stocks. Categorize them as safe (low volatility), balanced (moderate risk-reward), and high-risk (growth/momentum). Provide reasoning for each recommendation and use real stock name. dont explain the technical analysis in detail, just mention the indicators used and the conclusion. keep it simple and concise within 200 words."""

#     sug = generate(prompt)
#     print(sug)

#     op_format_prompt = f''' i have the recommentions text in this format {sug} and i want the output of this prompt should be in usable json format for dispalying on the frontend. just display the output in json format dont change the output text. and dont include ```json in the output text.
# '''
    
#     sug_json = generate(op_format_prompt)
#     print(type(sug_json))

#     #now convert the string to json
#     sug_json = sug_json.replace("```json","")
#     sug_json = sug_json.replace("```","")
#     sug_json = sug_json.replace("\n","")
#     # sug_json = sug_json.replace(" ","")
#     sug_json = sug_json.replace("null","None")
#     sug_json = sug_json.replace("false","False")
#     sug_json = sug_json.replace("true","True")
#     sug_json = eval(sug_json)
#     # print(sug_json)

#     return sug_json

    # return sug_json

    # return jsonify({"suggestion": f"Mock suggestion for budget {budget} and risk {risk}"})


if __name__ == "__main__":
    app.run(debug=True)



# @app.route("/suggestion", methods=["GET"])
# def suggestion():
#     budget = request.args.get("budget")
#     risk = request.args.get("risk")
#     print('suggestion route hit')

#     prompt = f"""I am building a stock recommendation system that takes user inputs such as budget {budget} and risk ability {risk} to suggest stocks. Analyze stocks based on:

# #     User Inputs: Investment budget, risk tolerance (low, medium, high), and investment type (growth, value, dividend, momentum).
# #     Fundamental Analysis: EPS, P/E ratio, ROE, Revenue Growth, Debt-to-Equity, Free Cash Flow.
# #     Technical Analysis: RSI, MACD, Moving Averages (50-day, 200-day), Bollinger Bands, Trading Volume.
# #     Market Sentiment: Recent news, social media trends, institutional holdings.
# #     Based on the users budget and risk profile, suggest 3-5 stocks. Categorize them as safe (low volatility), balanced (moderate risk-reward), and high-risk (growth/momentum). Provide reasoning for each recommendation and use real stock name. dont explain the technical analysis in detail, just mention the indicators used and the conclusion. keep it simple and concise within 200 words."""

#     sug = generate(prompt)
#     print(sug)

#     op_format_prompt = f'''i have the recommendations text in this format: "{sug}" 
    
#     Format this as valid JSON with the following structure:
#     {{
#       "recommendations": [
#         {{ "name": "Stock Name", "category": "safe/balanced/high-risk", "reasoning": "Reasoning text" }},
#         ...
#       ],
#       "userProfile": {{ "budget": "{budget}", "risk": "{risk}" }},
#       "importantNote": "Brief note about investment advice"
#     }}
    
#     Do not include code block markers like ```json.
#     '''
    
#     try:
#         sug_json_text = generate(op_format_prompt)
        
#         # Clean up any non-JSON formatting
#         import json
#         import re
        
#         # Remove any markdown code block syntax
#         sug_json_text = re.sub(r'```json|```', '', sug_json_text).strip()
        
#         # Parse the JSON string
#         sug_json = json.loads(sug_json_text)
        
#         # Return the JSON using Flask's jsonify
#         return jsonify(sug_json)
#     except Exception as e:
#         print(f"Error parsing JSON: {e}")
#         print(f"JSON text was: {sug_json_text}")
#         return jsonify({
#             "error": "Failed to parse recommendation data",
#             "recommendations": [],
#             "userProfile": {"budget": budget, "risk": risk}
#         }), 500