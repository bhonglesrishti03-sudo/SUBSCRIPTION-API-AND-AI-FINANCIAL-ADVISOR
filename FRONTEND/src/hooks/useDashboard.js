import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService.js";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboard();

      setDashboard(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
}