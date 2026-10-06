import { analyzeSubscriptions } from "../utils/financial-analysis.js";
import { Subscription } from "../models/subscriptions.model.js";
import { generateFinancialAdvice } from "../services/ai.service.js";

export const getFinancialAdvice = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    });

    if (!subscriptions.length) {
      return res.status(200).json({
        success: true,
        advice:
          "You don't have any subscriptions yet. Add a few subscriptions to receive personalized financial advice.",
      });
    }

    const analysis = analyzeSubscriptions(subscriptions);

    const prompt = `
You are an AI subscription spending advisor.

Analyze the VERIFIED subscription data provided by the backend.

IMPORTANT RULES:

1. Only use the subscription data provided below.
2. Never invent subscriptions, prices, dates, categories, savings, or user behavior.
3. The financial calculations were already performed by the backend.
4. Do not recalculate or modify backend-generated numerical values.
5. Recommendations must be directly supported by the provided data.
6. Clearly distinguish observations from recommendations.
7. If the data is insufficient for a recommendation, say so.
8. Do not provide investment, tax, loan, or regulated financial advice.
9. Keep recommendations practical and actionable.
10. Return ONLY valid JSON.

VERIFIED SUBSCRIPTION ANALYSIS:

${JSON.stringify(analysis, null, 2)}

Return exactly this structure:

{
  "summary": "Short overview of the user's subscription spending",
  "insights": [
    {
      "type": "spending|renewal|category|duplicate|saving",
      "title": "Short title",
      "description": "Evidence-based explanation"
    }
  ],
  "recommendations": [
    {
      "subscription": "Exact subscription name from the provided data",
      "action": "keep|review|cancel|downgrade",
      "reason": "Evidence-based reason",
      "estimatedMonthlySaving": 0
    }
  ],
  "limitations": [
    "Important limitation of this analysis"
  ]
}
`;

    const advice = await generateFinancialAdvice(prompt);

    res.status(200).json({
      success: true,
      advice,
    });
  } catch (error) {
    next(error);
  }
};