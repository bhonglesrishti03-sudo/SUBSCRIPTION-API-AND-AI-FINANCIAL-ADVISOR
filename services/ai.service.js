import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env.js";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export const generateFinancialAdvice = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI financial advisor. Give practical, concise, and personalized subscription recommendations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate AI advice.");
  }
};