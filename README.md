# EmpathAI – Universal Emotion-Aware Conversational Assistant

EmpathAI is a production-ready full-stack AI application that recognizes emotions from speech and provides empathetic responses.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (Planned)
- **AI/ML**: OpenAI Whisper, CNN-based SER, Gemini API, gTTS

## Project Structure
```
EmpathAI/
├── backend/            # FastAPI Backend
│   ├── main.py         # Entry point
│   └── requirements.txt # Python dependencies
└── frontend/           # React Frontend
    ├── src/            # React source files
    │   ├── components/ # Reusable components
    │   └── App.jsx     # Main application component
    └── package.json    # Node dependencies
```

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

## Milestone Status
- [x] **Milestone 1**: Project Initialization & Dashboard UI
- [ ] **Milestone 2**: Speech-to-Text & Backend Integration
- [ ] **Milestone 3**: Emotion Recognition Model Integration
- [ ] **Milestone 4**: NLP & Response Generation
- [ ] **Milestone 5**: Final Integration & Polish
