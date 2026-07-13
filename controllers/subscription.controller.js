// @ts-nocheck

import { Subscription } from "../models/subscriptions.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};


export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        next(error);
    }
}


export const createSubscription = async(req , res , next) => {
try {
  const subscription = await Subscription.create({
    ...req.body,
    user: req.user._id
  }) ;

    const result = await workflowClient.trigger({
  url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
  body: {
    subscriptionId: subscription._id.toString(),
  },
  headers: {
    "content-type": "application/json",
  },
  retries: 0,
});

console.log(result);

  res.status(201).json({success: true , data : subscription});
} catch (error) {
    next(error);
}
}

export const updateSubscription = async (req, res, next) => {
    try {

        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: updatedSubscription
        });

    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {

    try {

        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        await subscription.deleteOne();

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });

    } catch (error) {
        next(error);
    }

}


export const getUserSubscriptions = async(req , res , next) => {
    try {
        //Check if the user is the same as the one in the token
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

    const subscriptions = await Subscription.find({user: req.user.id});

    res.status(200).json({success: true , data: subscriptions});
    } catch (error) {
        next(error)
    }
}

export const cancelSubscription = async (req, res, next) => {

    try {

        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        subscription.status = "cancelled";

        await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription cancelled",
            data: subscription
        });

    } catch (error) {
        next(error);
    }

}

export const getUpcomingRenewals = async (req, res, next) => {

    try {

        const today = new Date();

        const nextWeek = new Date();

        nextWeek.setDate(today.getDate() + 7);

        const subscriptions = await Subscription.find({

            user: req.user._id,

            renewalDate: {
                $gte: today,
                $lte: nextWeek
            },

            status: "active"

        });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        next(error);
    }

}

/*
POST /subscriptions

        │
        ▼

JWT in Cookie/Header

        │
        ▼

authorize middleware

        │
jwt.verify()

        │
        ▼

req.user = {
    _id: "686c244"
}

        │
        ▼

createSubscription()

        │
        ▼

Subscription.create({

...req.body,

user: req.user._id

})

        │
        ▼

MongoDB saves

{
 name: "Netflix",
 price: 649,
 user: ObjectId("686c244")
}


*/