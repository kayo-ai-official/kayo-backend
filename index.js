const express = require("express");
const app = express();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json()); // ⭐ very important

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Kayo backend live 🚀"
  });
});

// AI RADIO / CHAT / SCRIPT
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly radio jockey." },
        { role: "user", content: prompt }
      ]
    });

    res.json({
      text: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
