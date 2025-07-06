from flask import Flask, request, jsonify
from flask_cors import CORS
from api.gemini import generate
from api.insurance import get_insurance_data

app = Flask(__name__)
CORS(app , supports_credentials=True, resources={r"/*": {"origins": "*"}})


@app.route("/insurance", methods=["GET"])
def insurance():
    print('insurance route hit')
    try:
        insurance_data = get_insurance_data()
        return jsonify(insurance_data)
    except Exception as e:
        print(f"Error fetching insurance data: {str(e)}")
        return jsonify({"error": "Failed to fetch insurance data"}), 500


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



if __name__ == "__main__":
    app.run(debug=True)


