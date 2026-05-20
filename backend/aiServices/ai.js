import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateResponse = async (prompt) => {
  try {
    console.log("GROQ API KEY EXISTS:", !!process.env.GROQ_API_KEY);

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing in .env");
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 8000,
      messages: [
        {
          role: "system",
          content: `You must return ONLY valid raw JSON. No markdown, no backticks, no explanation.
Return exactly this format: {"code": "...full html...", "message": "..."}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from Groq");
    }

    // Strip markdown fences just in case
    const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();

    console.log("Groq response received ✅");
    return cleaned;

  } catch (error) {
    console.error("Groq AI Service Error:", error.message);
    throw error;
  }
};

export default generateResponse;