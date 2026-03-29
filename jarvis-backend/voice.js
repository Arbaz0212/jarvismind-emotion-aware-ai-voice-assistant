require("dotenv").config();

const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

console.log("🔍 ENV CHECK:", process.env.ELEVEN_API_KEY);
console.log("🔍 API KEY STATUS:", ELEVEN_API_KEY ? "FOUND ✅" : "MISSING ❌");

async function generateVoice(text) {
  try {
    console.log("🎤 Generating voice for:", text);

    if (!ELEVEN_API_KEY) {
      console.error("❌ No API Key found");
      return null;
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
          "accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2"
        })
      }
    );

    console.log("📡 ElevenLabs status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ ElevenLabs Error FULL:", err);
      return null;
    }

    const buffer = await response.arrayBuffer();
    console.log("✅ Audio generated SUCCESS");

    return Buffer.from(buffer);

  } catch (err) {
    console.error("❌ Voice crash:", err.message);
    return null;
  }
}

module.exports = generateVoice;