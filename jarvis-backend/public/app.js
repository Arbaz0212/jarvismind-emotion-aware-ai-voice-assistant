console.log("Jarvis FINAL CLEAN loaded");

// ---------- UI ----------
const orb = document.getElementById("orb");
const startBtn = document.getElementById("startBtn");
const outputBox = document.getElementById("outputBox");
const moodBox = document.getElementById("moodBox");

// ---------- STATE ----------
let isListening = false;
let isAwake = false;
let isSpeaking = false;
let recognitionRunning = false;

let firstWakeDone = false;
let sleepTimer = null;

// ---------- SPEECH RECOGNITION ----------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-IN";

// ---------- SAFE CONTROL ----------
function startRecognition() {
  if (recognitionRunning) return;
  try {
    recognition.start();
    recognitionRunning = true;
  } catch {}
}

function stopRecognition() {
  try {
    recognition.abort();
  } catch {}
  recognitionRunning = false;
}

// ---------- ORB ----------
function animateOrb(active) {
  orb.classList.toggle("active", active);
}

// ---------- SLEEP TIMER ----------
function resetSleepTimer() {
  if (sleepTimer) clearTimeout(sleepTimer);

  sleepTimer = setTimeout(() => {
    console.log("😴 Jarvis sleeping...");
    isAwake = false;
  }, 60000);
}

// ---------- MOOD ----------
function detectMood(text) {
  if (text.includes("sad")) return "sad";
  if (text.includes("stress")) return "stress";
  if (text.includes("anxious")) return "anxiety";
  return "normal";
}

// ---------- EMOTION ----------
function addEmotion(text, mood) {
  if (mood === "sad") return "Hey… I’m here for you. " + text;
  if (mood === "stress") return "That feels heavy… " + text;
  if (mood === "anxiety") return "You’re okay… " + text;
  return text;
}

// ---------- ELEVENLABS ----------
const API_KEY = "PASTE_YOUR_KEY_HERE"; // 🔥 IMPORTANT
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

// ---------- SPEAK ----------
async function speak(text, mood = "normal") {
  if (!text) return;

  text = addEmotion(text, mood);

  console.log("Jarvis:", text);
  outputBox.innerText = "Jarvis: " + text;

  stopRecognition();
  isSpeaking = true;
  animateOrb(true);

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1"
        })
      }
    );

    if (!res.ok) throw new Error("ElevenLabs failed");

    const blob = await res.blob();
    const audio = new Audio(URL.createObjectURL(blob));

    audio.onended = () => {
      isSpeaking = false;
      animateOrb(false);
      startRecognition();
    };

    await audio.play();

  } catch (err) {
    console.warn("⚠️ ElevenLabs failed → fallback");

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";

    utter.onend = () => {
      isSpeaking = false;
      animateOrb(false);
      startRecognition();
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }
}

// ---------- BACKEND ----------
async function askBrain(message) {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  return data.reply;
}

// ---------- HELPERS ----------
function isWake(text) {
  return text.includes("jarvis");
}

// ---------- MAIN ----------
recognition.onresult = async (event) => {
  const transcript =
    event.results[event.results.length - 1][0].transcript
      .toLowerCase()
      .trim();

  console.log("Heard:", transcript);

  // 🚫 PREVENT SELF LISTENING
  if (isSpeaking) return;

  const mood = detectMood(transcript);
  moodBox.innerText = "Mood: " + mood.toUpperCase();

  // ---------- WAKE WORD ----------
  if (isWake(transcript)) {
    isAwake = true;
    resetSleepTimer();

    if (!firstWakeDone) {
      firstWakeDone = true;
      await speak("Yes Boss, how may I assist you?");
    } else {
      await speak("Yes Boss");
    }

    return;
  }

  // ---------- IGNORE IF SLEEP ----------
  if (!isAwake) return;

  resetSleepTimer();

  try {
    const reply = await askBrain(transcript);
    await speak(reply, mood);

  } catch {
    await speak("I’m tired… try again later.");
  }
};

// ---------- EVENTS ----------
recognition.onend = () => {
  if (isListening && !isSpeaking) startRecognition();
};

recognition.onerror = (e) => {
  console.log("Speech error:", e.error);
};

// ---------- START ----------
startBtn.addEventListener("click", async () => {
  await navigator.mediaDevices.getUserMedia({ audio: true });

  isListening = true;
  isAwake = false;
  firstWakeDone = false;

  startRecognition();

  // ✅ ALWAYS HUMAN VOICE (ElevenLabs first)
  await speak("Hello Arbaz. Jarvis systems online.");
});