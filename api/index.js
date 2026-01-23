import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// test route
app.get("/", (req, res) => {
  res.json({ status: "Kayo backend running 🚀" });
});

// AI test route
app.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
