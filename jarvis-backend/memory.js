import fs from "fs";
import path from "path";

const MEMORY_DIR = "./memory";
const LONG_TERM_FILE = path.join(MEMORY_DIR, "longTerm.json");

// Ensure directory + file exist
if (!fs.existsSync(MEMORY_DIR)) fs.mkdirSync(MEMORY_DIR);
if (!fs.existsSync(LONG_TERM_FILE)) fs.writeFileSync(LONG_TERM_FILE, "[]");

// 🧠 Save Memory (Enhanced)
export function saveLongTermMemory(entry, mood = "normal", response = "") {
  const data = JSON.parse(fs.readFileSync(LONG_TERM_FILE));

  data.push({
    text: entry,
    response: response,
    mood: mood,
    time: new Date().toISOString()
  });

  // Keep only last 50 entries (avoid file getting too big)
  const trimmed = data.slice(-50);

  fs.writeFileSync(LONG_TERM_FILE, JSON.stringify(trimmed, null, 2));
}

// 📜 Get Full Memory
export function getLongTermMemory() {
  return JSON.parse(fs.readFileSync(LONG_TERM_FILE));
}

// 🔍 Get Recent Conversations (for context)
export function getRecentMemory(limit = 5) {
  const data = JSON.parse(fs.readFileSync(LONG_TERM_FILE));
  return data.slice(-limit);
}

// 📊 Get Mood Summary (for demo purpose 🔥)
export function getMoodStats() {
  const data = JSON.parse(fs.readFileSync(LONG_TERM_FILE));

  const stats = {
    sad: 0,
    stress: 0,
    anxiety: 0,
    normal: 0
  };

  data.forEach(entry => {
    if (stats[entry.mood] !== undefined) {
      stats[entry.mood]++;
    }
  });

  return stats;
}