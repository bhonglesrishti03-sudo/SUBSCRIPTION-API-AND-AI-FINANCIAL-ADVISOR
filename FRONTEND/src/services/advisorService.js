import api from "./api";

export const getFinancialAdvice = async () => {
  const response = await api.get("/advisor");
  return response.data;
};