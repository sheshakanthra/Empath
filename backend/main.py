from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import whisper
import os
import shutil
import tempfile
import static_ffmpeg
from gtts import gTTS
import uuid
from emotion_model import EmotionRecognizer
from nlp_service import NLPService

# Initialize ffmpeg
static_ffmpeg.add_paths()

app = FastAPI(title="EmpathAI Backend", description="API for Universal Emotion-Aware Conversational Assistant")

# Ensure static directory exists
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
AUDIO_DIR = os.path.join(STATIC_DIR, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Load models
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("Whisper model loaded.")

print("Initializing Emotion Recognizer...")
emotion_recognizer = EmotionRecognizer()
print("Emotion Recognizer initialized.")

print("Initializing NLP Service...")
nlp_service = NLPService()
print("NLP Service initialized.")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to EmpathAI API"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "EmpathAI",
        "version": "1.0.0"
    }

@app.post("/api/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Create a temporary file to store the uploaded audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
            shutil.copyfileobj(file.file, temp_audio)
            temp_audio_path = temp_audio.name

        # 1. Transcribe the audio using Whisper
        result = whisper_model.transcribe(temp_audio_path)
        transcript = result["text"].strip()

        # 2. Detect Emotion using CNN model
        emotion_result = emotion_recognizer.predict(temp_audio_path)

        # 3. Analyze Intent, Sentiment and Generate AI Response
        nlp_result = await nlp_service.analyze_and_respond(transcript, emotion_result)
        ai_response_text = nlp_result.get("ai_response", "")

        # 4. Generate Text-to-Speech audio
        audio_filename = f"{uuid.uuid4()}.mp3"
        audio_path = os.path.join(AUDIO_DIR, audio_filename)
        
        if ai_response_text:
            tts = gTTS(text=ai_response_text, lang='en')
            tts.save(audio_path)
            audio_url = f"/static/audio/{audio_filename}"
        else:
            audio_url = None

        # Clean up the temporary input file
        os.remove(temp_audio_path)

        return {
            "transcript": transcript,
            "emotion": emotion_result,
            "intent": nlp_result.get("intent", "N/A"),
            "sentiment": nlp_result.get("sentiment", "N/A"),
            "ai_response": ai_response_text,
            "audio_url": audio_url,
            "status": "success"
        }
    except Exception as e:
        print(f"Error during processing: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
