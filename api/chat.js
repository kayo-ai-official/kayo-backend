import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are KAYO, a friendly AI radio host. Speak in warm Hindi-English mix."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "AI response failed"
    });
  }
}