import { Router} from "express";
import authorize from '../middlewares/auth.middleware.js';
import { cancelSubscription, createSubscription, deleteSubscription, getSubscription, getSubscriptions, getUserSubscriptions, updateSubscription , getUpcomingRenewals} from "../controllers/subscription.controller.js";
import { sendReminderEmail } from "../utils/send-email.js";
const subscriptionRouter = Router();

subscriptionRouter.post("/", authorize, createSubscription);

//used for testing
// subscriptionRouter.get("/test-email", authorize, async (req, res) => {
//   try {
//     await sendReminderEmail({
//       to: "your_email@gmail.com", // Replace with your email
//       type: "7 days before reminder",
//       subscription: {
//         name: "Netflix Premium",
//         renewalDate: new Date(),
//         currency: "USD",
//         price: 20,
//         frequency: "monthly",
//         paymentMethod: "Credit Card",
//         user: {
//           name: "Sri",
//         },
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Test email sent successfully!",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/", authorize, getSubscriptions);

export default subscriptionRouter;