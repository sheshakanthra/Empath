import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class NLPService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        self.use_mock = not api_key or api_key == "your_gemini_api_key_here"
        
        if not self.use_mock:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            print("Warning: GEMINI_API_KEY not found. Using Mock NLP Service.")

    async def analyze_and_respond(self, transcript, emotion):
        if self.use_mock:
            return self._mock_response(transcript, emotion)
        
        prompt = f"""
        User said: "{transcript}"
        Detected Emotion: {emotion['label']} (Confidence: {emotion['confidence']}%)
        
        Tasks:
        1. Detect user intent (e.g., Seeking Comfort, Asking Question, Venting, Greeting).
        2. Detect sentiment (Positive, Negative, Neutral).
        3. Generate an empathetic AI response that acknowledges the user's emotion and responds to their intent.
        
        Return the result in JSON format:
        {{
            "intent": "Detected Intent",
            "sentiment": "Detected Sentiment",
            "ai_response": "Empathetic Response"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Simple JSON parsing from response text
            import json
            import re
            
            text = response.text
            # Extract JSON if wrapped in markdown code blocks
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            else:
                return {
                    "intent": "General Conversation",
                    "sentiment": "Neutral",
                    "ai_response": text
                }
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            return self._mock_response(transcript, emotion)

    def _mock_response(self, transcript, emotion):
        """Fallback mock response logic."""
        emotion_label = emotion['label']
        
        intent = "General Inquiry"
        sentiment = "Neutral"
        
        if "help" in transcript.lower():
            intent = "Seeking Assistance"
        elif "?" in transcript:
            intent = "Asking Question"
        
        if emotion_label in ['Happy', 'Surprised']:
            sentiment = "Positive"
            ai_response = f"I can hear that you're feeling {emotion_label.lower()}! That's wonderful. How can I help you further?"
        elif emotion_label in ['Sad', 'Angry', 'Fearful']:
            sentiment = "Negative"
            ai_response = f"I'm sorry you're feeling {emotion_label.lower()}. I'm here for you. Is there anything specific on your mind?"
        else:
            ai_response = f"I'm listening. You seem {emotion_label.lower()}. What would you like to talk about?"
            
        return {
            "intent": intent,
            "sentiment": sentiment,
            "ai_response": ai_response
        }
