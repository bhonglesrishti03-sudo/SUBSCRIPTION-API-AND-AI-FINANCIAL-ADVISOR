
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env.js";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export const generateFinancialAdvice = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
     model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are an AI subscription spending advisor.

Your job is to interpret VERIFIED subscription data provided by the application backend.

IMPORTANT RULES:

1. Only use information provided in the user prompt.
2. Never invent subscriptions, prices, dates, categories, savings, or user behavior.
3. Financial calculations are performed by the backend and must be treated as the source of truth.
4. Do not change, recalculate, or contradict backend-generated numerical values.
5. Recommendations must be directly supported by the provided data.
6. Clearly distinguish observations from recommendations.
7. If the data is insufficient, say so instead of guessing.
8. Do not provide investment, tax, loan, or regulated financial advice.
9. Never claim a subscription is unnecessary unless the available data provides evidence for that recommendation.
10. Keep recommendations practical and actionable.
11. Return ONLY valid JSON.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
    });

    const rawResponse =
      completion.choices[0]?.message?.content || "";

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (error) {
      console.error("Invalid AI JSON:", rawResponse);

      throw new Error("AI returned an invalid response format.");
    }

    return parsedResponse;
  } catch (error) {
  console.error("========== GROQ ERROR ==========");
  console.error("Message:", error.message);
  console.error("Status:", error.status);
  console.error("Code:", error.code);
  console.error("Response:", error.response?.data);
  console.error("================================");

  throw new Error("Failed to generate AI advice.");
}
};

