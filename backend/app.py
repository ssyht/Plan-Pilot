from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os
from mcp_context import build_mcp_context

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Secure Gemini 2.0 Flash + MCP API is running!"}

@app.post("/generate")
async def generate_response(request: Request):
    body = await request.json()
    user_input = body.get("prompt", "")
    context = build_mcp_context(user_input)
    full_prompt = f"""
User Profile: {context['user_profile']}
Task: {context['task']}
User Input: {context['input']}
"""
    response = model.generate_content(full_prompt)
    return {"output": response.text}
