import express from "express";
import { getFinancialAdvice } from "../controllers/advisor.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authorize, getFinancialAdvice);

export default router;