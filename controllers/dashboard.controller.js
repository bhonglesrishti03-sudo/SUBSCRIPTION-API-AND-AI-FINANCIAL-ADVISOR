import { Subscription } from "../models/subscriptions.model.js";

/* ---------------- Monthly Equivalent ---------------- */

const exchangeRates = {
  INR: 1,
  USD: 95.41,
  EUR: 108.86,
  GBP: 128.21,
  JPY: 0.59,
  CAD: 67.76,
  AUD: 67.21,
};

const getMonthlyEquivalent = (subscription) => {
  const rate = exchangeRates[subscription.currency] || 1;

  let monthlyAmount = 0;

  switch (subscription.frequency) {
    case "daily":
      monthlyAmount = subscription.price * 30;
      break;

    case "weekly":
      monthlyAmount = subscription.price * 4.33;
      break;

    case "monthly":
      monthlyAmount = subscription.price;
      break;

    case "yearly":
      monthlyAmount = subscription.price / 12;
      break;

    default:
      monthlyAmount = 0;
  }

  return monthlyAmount * rate;
};

/* ---------------- Dashboard Controller ---------------- */

export const getDashboard = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    /* ===========================
       Dashboard Stats
    =========================== */

    const activeSubscriptions = subscriptions.filter(
      (sub) => sub.status === "active"
    );

    const monthlySpending = activeSubscriptions.reduce(
      (total, sub) => total + getMonthlyEquivalent(sub),
      0
    );

    const today = new Date();

    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const upcomingRenewals = activeSubscriptions.filter(
      (sub) =>
        sub.renewalDate >= today &&
        sub.renewalDate <= next30Days
    ).length;

    const categories = new Set(
      activeSubscriptions.map((sub) => sub.category)
    ).size;

    /* ===========================
       Monthly Spending Trend
    =========================== */

    const monthlyTrend = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();

      date.setMonth(date.getMonth() - (5 - index));

      const month = date.toLocaleString("default", {
        month: "short",
      });

      const amount = subscriptions
        .filter((sub) => {
          const created = new Date(sub.createdAt);

          return (
            created.getMonth() === date.getMonth() &&
            created.getFullYear() === date.getFullYear() &&
            sub.status === "active"
          );
        })
        .reduce(
          (sum, sub) => sum + getMonthlyEquivalent(sub),
          0
        );

      return {
        month,
        amount: Number(amount.toFixed(2)),
      };
    });

    /* ===========================
       Category Distribution
    =========================== */
    console.log(
  activeSubscriptions.map((sub) => ({
    name: sub.name,
    category: sub.category,
  }))
);

const categoryMap = {};

activeSubscriptions.forEach((sub) => {
  categoryMap[sub.category] =
  (categoryMap[sub.category] || 0) +
  getMonthlyEquivalent(sub);
});

// console.log("ACTIVE SUBSCRIPTIONS");

// activeSubscriptions.forEach((sub) => {
//   console.log({
//     name: sub.name,
//     category: sub.category,
//     price: sub.price,
//     user: sub.user.toString(),
//   });
// });

const categoryDistribution = Object.entries(categoryMap).map(
  ([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  })
);

    /* ===========================
       Recent Subscriptions
    =========================== */

    const recentSubscriptions = subscriptions
      .slice(0, 5)
      .map((sub) => ({
        _id: sub._id,
        name: sub.name,
        category: sub.category,
        price: sub.price,
        currency: sub.currency,
        frequency: sub.frequency,
        renewalDate: sub.renewalDate,
        status: sub.status,
      }));

    /* ===========================
       AI Placeholder
    =========================== */

    const aiInsight = {
      title: "AI Advisor",
      description:
        "Your subscriptions look healthy. Gemini-powered financial insights will appear here soon.",
    };

    /* ===========================
       Response
    =========================== */

    res.status(200).json({
      success: true,

      data: {
        stats: {
          monthlySpending: Number(monthlySpending.toFixed(2)),
          activeSubscriptions: activeSubscriptions.length,
          upcomingRenewals,
          categories,
        },

        monthlyTrend,

        categoryDistribution,

        recentSubscriptions,

        aiInsight,
      },
    });
  } catch (error) {
    next(error);
  }
};