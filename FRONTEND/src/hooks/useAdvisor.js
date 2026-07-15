import { useState, useEffect } from "react";
import { getFinancialAdvice } from "../services/advisorService";

export default function useAdvisor() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdvice = async () => {
    try {
      setLoading(true);

      const response = await getFinancialAdvice();

      setAdvice(response.advice);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate advice."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return {
    advice,
    loading,
    error,
    refresh: fetchAdvice,
  };
}