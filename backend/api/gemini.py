import base64
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()


def generate(prompt):
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    # model = "gemini-2.0-pro-exp-02-05"
    model = "gemini-2.0-flash-lite"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        top_k=64,
        max_output_tokens=8192,
        response_mime_type="text/plain",
    )

    response_text=""

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        # print(chunk.text, end="")
        response_text += chunk.text

    return response_text

if __name__ == "__main__":
    generate(prompt,200, 'low')
