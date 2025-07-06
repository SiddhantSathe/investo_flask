from flask import Flask, request, jsonify
from flask_cors import CORS
from api.gemini import generate
from api.insurance import get_insurance_data
from api.finnhub import get_finnhub_api_key
from api.bonds import get_bonds_data

import requests
import os   
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app , supports_credentials=True, resources={r"/*": {"origins": "*"}})

finnhub_client = get_finnhub_api_key()

@app.route('/bonds/', methods=['GET'])
def bonds():
    BONDS_API = os.getenv("BONDS_API")
    response = requests.get(BONDS_API)
    return response.json()

@app.route('/stock/<symbol>', methods=['GET'])
def get_stock(symbol):
    try:
        stock_data = finnhub_client.quote(symbol)  # Get stock prices
        company_data = finnhub_client.company_profile2(symbol=symbol)  # Get company info

        if "name" not in company_data:
            return jsonify({"error": "Stock not found"}), 404

        return jsonify({
            "name": company_data.get("name", "Unknown"),
            "symbol": symbol,
            "price": stock_data["c"],
            "high": stock_data["h"],
            "low": stock_data["l"],
            "change": stock_data["d"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
STOCK_SYMBOLS = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT", "META", "NVDA", "NFLX", "IBM", "ORCL", "AMD", "INTC"]

@app.route('/stockdetails/<symbol>', methods=['GET'])
def get_stock_details(symbol):
    try:
        quote = finnhub_client.quote(symbol)  # Fetch stock price details
        profile = finnhub_client.company_profile2(symbol=symbol)  # Fetch company details

        stock_info = {
            "symbol": symbol,
            "name": profile.get("name", "N/A"),
            "current_price": quote.get("c", 0),
            "high": quote.get("h", 0),
            "low": quote.get("l", 0),
            "change": quote.get("dp", 0),
            "market_cap": profile.get("marketCapitalization", "N/A"),
            "prev_close": quote.get("pc", 0),
            "exchange": profile.get("exchange", "N/A"),
            "pe_ratio": profile.get("pe", "N/A"),
            "dividend_yield": profile.get("dividendYield", "N/A"),
            "eps": profile.get("eps", "N/A"),
        }
        print(stock_info)
        return jsonify(stock_info)
    
    except Exception as e:
        return jsonify({"error": f"Error fetching data for {symbol}: {str(e)}"}), 500
    
@app.route('/recommendation/<symbol>', methods=['GET'])
def get_recommendation(symbol):
    try:
        recommendations = finnhub_client.recommendation_trends(symbol)  # Fetch recommendation trends
        if not recommendations:
            return jsonify({"error": "No recommendation data available"}), 404
        return jsonify(recommendations)  # Return as JSON list
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/stocks', methods=['GET'])
def get_all_stocks():
    stock_list = []
    for symbol in STOCK_SYMBOLS:
        try:
            stock_data = finnhub_client.quote(symbol)
            company_data = finnhub_client.company_profile2(symbol=symbol)

            stock_list.append({
                "name": company_data.get("name", symbol),
                "symbol": symbol,
                "price": stock_data.get("c", "N/A"),
                "high": stock_data.get("h", "N/A"),
                "low": stock_data.get("l", "N/A"),
                "change": stock_data.get("d", "N/A")
            })
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")

    return jsonify(stock_list)


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


