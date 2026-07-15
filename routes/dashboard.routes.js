import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authorize, getDashboard);

export default router;