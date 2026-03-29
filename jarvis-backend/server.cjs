require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const generateVoice = require("./voice");

// ✅ FIX fetch for Node
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Say that again.", audio: null });
    }

    console.log("🧠 Jarvis thinking:", message);

    const prompt = `
You are Jarvis, a smart human-like AI assistant created by Arbaz.

RULES:
- Speak naturally like a real human
- 1–3 short sentences
- No robotic tone

IDENTITY:
"I’m Jarvis, an Artificial Intelligence created by Arbaz. I’m here to help you."

User: ${message}
Jarvis:
`;

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3.1",
        prompt,
        stream: false
      })
    });

    // ✅ SAFETY CHECK
    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      console.error("❌ Ollama error:", errText);
      return res.json({
        reply: "Brain not responding properly.",
        audio: null
      });
    }

    const data = await ollamaRes.json();

    const reply =
      data.response?.trim() ||
      "I’m here… tell me again.";

    // ✅ VOICE
    const audioBuffer = await generateVoice(reply);

    console.log("🎤 Audio:", audioBuffer ? "YES" : "NO");

    res.json({
      reply,
      audio: audioBuffer ? audioBuffer.toString("base64") : null
    });

  } catch (err) {
    console.error("❌ Server error:", err.message);

    res.json({
      reply: "I’m tired… try again later.",
      audio: null
    });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 Jarvis running at http://localhost:${PORT}`);
});