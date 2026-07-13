import { Router} from "express";
import authorize from '../middlewares/auth.middleware.js';
import { cancelSubscription, createSubscription, deleteSubscription, getSubscription, getSubscriptions, getUserSubscriptions, updateSubscription , getUpcomingRenewals} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/", authorize, getSubscriptions);

export default subscriptionRouter;