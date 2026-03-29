const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
const MODEL = "llama3.1";

async function askOllama(userPrompt) {
  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        prompt: `
You are Jarvis, a human-like assistant created by Arbaz.

STRICT RULES:
- Max 10–12 words
- Max 1 sentence
- Sound like a real human, NOT AI
- No lists, no suggestions, no explanations
- No robotic phrases like "would you like"

EMOTIONAL STYLE:
- Sad → "Hey… I’m here for you."
- Stress → "That sounds heavy… breathe slowly."
- Anxiety → "You’re okay… I’m right here."

STYLE:
- Soft
- Calm
- Caring
- Natural

If response sounds robotic → rewrite it naturally.

User: ${userPrompt}
Jarvis:
`
      })
    });

    if (!res.ok) {
      throw new Error(`Ollama HTTP ${res.status}`);
    }

    const data = await res.json();

    let reply = data.response?.trim();

    // 🔥 HARD HUMAN FILTER (VERY IMPORTANT)
    if (!reply || reply.length > 80 || reply.includes("would you")) {
      return "Hey… I’m here with you.";
    }

    return reply;

  } catch (err) {
    console.error("OLLAMA ERROR:", err.message);
    return "I’m here… try again slowly.";
  }
}

module.exports = askOllama;