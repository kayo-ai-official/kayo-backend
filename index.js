import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// test route (health check)
app.get("/", (req, res) => {
  res.send("Kayo backend is running 🚀");
});

// AI Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI radio host. Speak in friendly Hindi."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

// IMPORTANT for Vercel
export default app;
