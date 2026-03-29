const { exec } = require("child_process");

function detectMood(text) {
  const lower = text.toLowerCase();

  if (["sad", "depressed", "unhappy", "lonely"].some(word => lower.includes(word))) {
    return "sad";
  }

  if (["stress", "stressed", "pressure", "overwhelmed"].some(word => lower.includes(word))) {
    return "stress";
  }

  if (["anxious", "anxiety", "nervous", "panic"].some(word => lower.includes(word))) {
    return "anxiety";
  }

  return "normal";
}

function mentalHealthResponse(mood) {
  if (mood === "sad") {
    return "I'm here for you. You're not alone. Maybe try talking to someone you trust or take a short walk.";
  }

  if (mood === "stress") {
    return "Take a deep breath. Try this: inhale for 4 seconds, hold for 7, and exhale for 8. It really helps.";
  }

  if (mood === "anxiety") {
    return "Focus on your breathing. Look around and name 5 things you can see. This can help ground you.";
  }

  return null;
}

function runSkill(text) {
  const lower = text.toLowerCase();

  // 🧠 NEW: Mood Detection
  const mood = detectMood(lower);
  const mhResponse = mentalHealthResponse(mood);

  if (mhResponse) {
    return mhResponse;
  }

  // 🌐 Existing Skills
  if (lower.includes("open youtube")) {
    exec("start https://youtube.com");
    return "Opening YouTube.";
  }

  if (lower.includes("open google")) {
    exec("start https://google.com");
    return "Opening Google.";
  }

  if (lower.includes("who are you")) {
    return "I am Jarvis, a virtual assistant focused on helping with tasks and mental well-being.";
  }

  return null;
}

module.exports = { runSkill };