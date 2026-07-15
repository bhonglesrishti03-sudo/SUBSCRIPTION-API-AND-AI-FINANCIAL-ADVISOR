import { useEffect, useState } from "react";
import { getSubscriptions } from "../services/subscriptionService";

export default function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);

      const response = await getSubscriptions();

      setSubscriptions(response.data.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load subscriptions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return {
    subscriptions,
    setSubscriptions, // Useful for optimistic updates
    loading,
    error,
    refetch: fetchSubscriptions,
  };
}