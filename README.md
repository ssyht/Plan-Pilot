# PlanPilot 

**PlanPilot** is a secure, multilingual GenAI budget assistant built on the Certifier Framework, integrating **Google Gemini 2.0 Flash**, **Model Context Protocol (MCP)**, and **interactive visualizations**.

> Created by Sanjit, Bhanu, Mehul, and Lomesh for Google DevFest Hackathon 2025.

---

### How It Works

```
User Query → Translate if needed → Gemini 2.0 Flash with MCP → AI Budget Plan → Chart Visualization
```

---

### Model Context Protocol (MCP) Deep Dive
MCP enhances large model reasoning by injecting contextual variables such as:

- **User profile** (e.g., "Indian student in metro city")
- **Task prompt** (e.g., "generate personalized multilingual budget")
- **Prompt sanitation** (e.g., map to schema before sending)

> Full explanation: [Google Cloud blog on MCP](https://medium.com/google-cloud/model-context-protocol-mcp-with-google-gemini-llm-a-deep-dive-full-code-ea16e3fac9a3)

---

### Tech Stack
- **FastAPI** (Gemini + MCP backend)
- **React + Tailwind CSS** (Frontend)
- **Google Gemini 2.0 Flash API**
- **Recharts** (EDA Charts)
- **Certifier Framework** for confidential computing (Phase 1 integration)

---

### Features
- Multilingual support (Hindi, Tamil, etc.)
- Secure backend + policy enforcement
- EDA graphs by week and category
- MCP-enabled contextual response generation
- Tailored for students + general public financial literacy

---

### Run Locally

```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

---

### Future Roadmap
- ✈Deploy to GCP with secured endpoints
- Add PDF download of generated plan
- Personalize UI with avatar, budget goals
- Integrate text-to-speech for accessibility

---

