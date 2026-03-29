# jarvismind-emotion-aware-ai-voice-assistant

🧠 JarvisMind — Emotion-Aware AI Voice Assistant

A human-centered AI assistant that listens, understands emotions, and responds with empathy in real-time.


🚀 Overview

JarvisMind is an intelligent voice-based AI assistant designed to support cognitive wellness through natural conversation.
Unlike traditional assistants, JarvisMind doesn’t just respond — it understands how you feel.
It uses real-time voice input, detects emotional context (stress, sadness, anxiety), and delivers empathetic, human-like responses powered by AI.


💡 Why This Matters

Mental health struggles often go unnoticed in daily conversations.
JarvisMind bridges this gap by:
Providing instant emotional support
Enabling natural voice interaction
Making AI feel more human and approachable


✨ Key Features

🎙️ Voice-Based Interaction
Wake word activation: “Hey Jarvis”
Continuous listening mode
Hands-free conversation

🧠 Emotion Detection
Detects:
Stress
Sadness
Anxiety
Adapts tone and response accordingly

🤖 AI-Powered Responses
Integrated with LLM (Ollama - LLaMA 3.1)
Context-aware replies
Short, meaningful, non-robotic responses

💙 Empathetic Behavior
Emotion-aware replies like:
“Hey… I’m here for you.”
“That feels heavy… take a breath.”
Designed for mental wellness support

🔊 Voice Output System
Text-to-Speech (TTS) response
Fallback mechanism ensures reliability
Smooth conversational experience

⚡ Real-Time Processing
Low latency interaction
Continuous listening + response loop
No manual input required

🏗️ Tech Stack
Frontend
HTML, CSS, JavaScript
Web Speech API (Speech Recognition + TTS)
Backend
Node.js + Express
AI Engine
Ollama (LLaMA 3.1)
Voice Processing
Browser-based Speech Recognition
TTS with fallback handling

⚙️ How It Works
Plain text
User Voice
   ↓
Speech Recognition (Browser)
   ↓
Emotion Detection (Frontend Logic)
   ↓
Backend API (Node.js)
   ↓
LLM Processing (Ollama)
   ↓
Response Generation
   ↓
Text-to-Speech Output

🖥️ Setup & Installation

1️⃣ Clone the Repository
Bash
git clone https://https://github.com/Arbaz0212/jarvismind-emotion-aware-ai-voice-assistant
cd jarvismind
2️⃣ Install Backend Dependencies
Bash
cd backend
npm install
3️⃣ Run Ollama (IMPORTANT)
Make sure Ollama is running:
Bash
ollama run llama3.1
4️⃣ Start Backend Server
Bash
node server.cjs
5️⃣ Run Frontend
Open index.html in browser
Click Start Jarvis
🎯 Usage
Click Start Jarvis


Say:

Hey Jarvis
Speak your query naturally:

“I feel stressed”
“Tell me something”

Jarvis responds with voice + emotion-aware reply


🧪 Example Interactions
User Input
Jarvis Response

“I feel sad”
“Hey… I’m here for you. Want to talk?”

“I’m stressed”
“That feels heavy… take a breath.”

“Who are you?”
“I’m Jarvis, created by Arbaz. I’m here to help you.”


🧠 Challenges Faced

Preventing self-listening feedback loops
Handling speech recognition interruptions
Making responses feel human, not robotic
Managing real-time voice + AI latency
Designing emotion detection with limited time.


📈 Future Improvements

🧠 Memory-based conversations (context awareness)
🎧 Personalized emotional profiles
📱 Mobile app version
🌐 Cloud deployment
🔊 Advanced human-like voice synthesis


👤 Author
Arbaz
AI Developer | Builder of JarvisMind


🏁 Hackathon Submission
Built for: NeuroHack Spring 2026 — Cognitive Wellness & AI


📜 License
This project is for educational and hackathon purposes.

⭐ Support
If you found this project interesting:
⭐ Star the repo
🍴 Fork it
💬 Share feedback
