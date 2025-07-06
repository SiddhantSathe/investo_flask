import requests
import os
from dotenv import load_dotenv

load_dotenv()
BONDS_API = os.getenv("BONDS_API")

def get_bonds_data():
    response = requests.get(BONDS_API)
    return response.json()