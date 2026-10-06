
const getMonthlyCost = (subscription) => {
  const price = Number(subscription.price) || 0;

  switch (subscription.frequency) {
    case "weekly":
      return (price * 52) / 12;

    case "monthly":
      return price;

    case "quarterly":
      return price / 3;

    case "yearly":
      return price / 12;

    default:
      return price;
  }
};

const getAnnualCost = (subscription) => {
  return getMonthlyCost(subscription) * 12;
};

const getDaysUntilRenewal = (renewalDate) => {
  if (!renewalDate) return null;

  const today = new Date();
  const renewal = new Date(renewalDate);

  const diff = renewal.getTime() - today.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const analyzeSubscriptions = (subscriptions) => {
  const totalMonthly = subscriptions.reduce(
    (sum, subscription) => sum + getMonthlyCost(subscription),
    0
  );

  const totalAnnual = totalMonthly * 12;

  const categoryMap = {};

  subscriptions.forEach((subscription) => {
    const category = subscription.category || "Other";

    if (!categoryMap[category]) {
      categoryMap[category] = {
        monthly: 0,
        count: 0,
      };
    }

    categoryMap[category].monthly += getMonthlyCost(subscription);
    categoryMap[category].count += 1;
  });

  const categories = Object.entries(categoryMap)
    .map(([category, data]) => ({
      category,
      monthly: Number(data.monthly.toFixed(2)),
      annual: Number((data.monthly * 12).toFixed(2)),
      count: data.count,
    }))
    .sort((a, b) => b.monthly - a.monthly);

  const upcomingRenewals = subscriptions
    .map((subscription) => ({
      name: subscription.name,
      price: subscription.price,
      currency: subscription.currency,
      renewalDate: subscription.renewalDate,
      daysUntilRenewal: getDaysUntilRenewal(subscription.renewalDate),
    }))
    .filter(
      (subscription) =>
        subscription.daysUntilRenewal !== null &&
        subscription.daysUntilRenewal >= 0 &&
        subscription.daysUntilRenewal <= 30
    )
    .sort((a, b) => a.daysUntilRenewal - b.daysUntilRenewal);

  const topSubscriptions = subscriptions
    .map((subscription) => ({
      name: subscription.name,
      price: subscription.price,
      currency: subscription.currency,
      monthlyCost: Number(getMonthlyCost(subscription).toFixed(2)),
      annualCost: Number(getAnnualCost(subscription).toFixed(2)),
      category: subscription.category || "Other",
    }))
    .sort((a, b) => b.monthlyCost - a.monthlyCost)
    .slice(0, 5);

  return {
    subscriptionCount: subscriptions.length,
    totalMonthly: Number(totalMonthly.toFixed(2)),
    totalAnnual: Number(totalAnnual.toFixed(2)),
    categories,
    upcomingRenewals,
    topSubscriptions,
  };
};

export {
  getMonthlyCost,
  getAnnualCost,
  getDaysUntilRenewal,
  analyzeSubscriptions,
};

