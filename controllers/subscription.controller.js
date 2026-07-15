// @ts-nocheck

import { Subscription } from "../models/subscriptions.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

// Get all subscriptions
export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};


// Get single subscription
export const getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });

  } catch (error) {
    next(error);
  }
};


// Create subscription
export const createSubscription = async (req, res, next) => {
  try {

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });


    // Trigger reminder workflow
    await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription._id.toString(),
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });


    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });


  } catch (error) {
    next(error);
  }
};


// Update subscription
export const updateSubscription = async (req, res, next) => {
  try {

    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });


  } catch (error) {
    next(error);
  }
};



// Delete subscription
export const deleteSubscription = async (req, res, next) => {
  try {

    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });


    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });


  } catch (error) {
    next(error);
  }
};
export const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });

  } catch (error) {
    next(error);
  }
};



export const cancelSubscription = async (req, res, next) => {
  try {

    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        status: "cancelled",
      },
      {
        new: true,
      }
    );


    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });


  } catch(error) {
    next(error);
  }
};



export const getUpcomingRenewals = async (req, res, next) => {
  try {

    const subscriptions = await Subscription.find({
      user: req.user._id,
      renewalDate: {
        $gte: new Date(),
      },
    }).sort({
      renewalDate: 1,
    });


    res.status(200).json({
      success: true,
      data: subscriptions,
    });


  } catch(error) {
    next(error);
  }
};
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