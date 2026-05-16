import dotenv from "dotenv";
dotenv.config(); // ✅ ensure env is loaded

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const model = "openrouter/free"    

const generateResponse = async (prompt) => {
    try {
        // 🔍 Debug (remove later)
        console.log("API KEY EXISTS:", !!OPENROUTER_API_KEY);

        if (!OPENROUTER_API_KEY) {
            throw new Error("OPENROUTER_API_KEY is missing in .env");
        }

        const res = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`, // ✅ correct
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                max_tokens: 8000, 
                messages: [
                    {
                        role: "system",
                        content: "You must return ONLY valid raw JSON"
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        // ❌ Handle API errors properly
        if (!res.ok) {
            const errText = await res.text();
            console.error("OpenRouter RAW ERROR:", errText);
            throw new Error(`OpenRouter error: ${errText}`);
        }

        const data = await res.json();

        // 🔍 Debug full response (optional)
        console.log("OpenRouter response:", JSON.stringify(data, null, 2));

        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("No content returned from AI");
        }

        return content;

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw error; // 🔥 rethrow so controller handles it
    }
};

export default generateResponse;