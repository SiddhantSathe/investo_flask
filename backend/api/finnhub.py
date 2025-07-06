import finnhub
import os
# Load environment variables
from dotenv import load_dotenv
load_dotenv()


finnhub_api_key = os.getenv("FINNHUB_API_KEY")
def get_finnhub_api_key():
    if not finnhub_api_key:
        raise ValueError("FINNHUB_API_KEY is not set in the environment variables.")
    finnhub_client = finnhub.Client(api_key=finnhub_api_key)
    return finnhub_client