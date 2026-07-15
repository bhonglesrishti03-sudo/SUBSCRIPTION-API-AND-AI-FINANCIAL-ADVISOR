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

    const monthlySpending = subscriptions.reduce((sum, sub) => {
  let monthlyPrice = sub.price;

  switch (sub.frequency) {
    case "daily":
      monthlyPrice = sub.price * 30;
      break;

    case "weekly":
      monthlyPrice = sub.price * 4;
      break;

    case "monthly":
      monthlyPrice = sub.price;
      break;

    case "yearly":
      monthlyPrice = sub.price / 12;
      break;

    default:
      monthlyPrice = sub.price;
  }

  return sum + monthlyPrice;
}, 0);
    const subscriptionDetails = subscriptions
      .map(
        (sub) => `
Name: ${sub.name}
Price: ${sub.price} ${sub.currency}
Category: ${sub.category}
Frequency: ${sub.frequency}
Status: ${sub.status}
Renewal Date: ${new Date(sub.renewalDate).toDateString()}
`
      )
      .join("\n-------------------------\n");

  const prompt = `
You are a professional AI Financial Advisor.

Analyze the user's subscription portfolio and provide practical financial insights.

Estimated Monthly Spending:
₹${monthlySpending.toFixed(2)}

Subscriptions:
${subscriptionDetails}

Provide your response in the following format:

## Financial Health Score
Give a score out of 10 with one sentence explaining it.

## Spending Summary
- Total monthly spending
- Number of subscriptions
- Most expensive subscription
- Least expensive subscription

## Savings Opportunities
Identify subscriptions that appear unnecessary, duplicate, inactive, or expensive.
Estimate how much the user could save.

## Renewal Alerts
Mention subscriptions renewing soon or those that deserve attention.

## Recommendations
Provide 4-6 actionable recommendations for reducing recurring expenses and managing subscriptions better.

Rules:
- Keep the response under 250 words.
- Use Markdown headings and bullet points.
- Be concise and friendly.
- Do not invent subscriptions that are not provided.
- Base every recommendation only on the supplied subscription data.
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