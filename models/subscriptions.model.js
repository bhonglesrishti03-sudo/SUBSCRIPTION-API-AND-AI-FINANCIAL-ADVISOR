import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },

    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: {
        values: ["INR", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD"],
        message: "{VALUE} is not a supported currency.",
      },
      default: "INR",
      required: true,
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Entertainment",
        "Streaming",
        "Music",
        "Cloud Storage",
        "Education",
        "Productivity",
        "Gaming",
        "Health & Fitness",
        "Shopping",
        "Finance",
        "Software",
        "Other",
      ],
      default: "Other",
    },

    paymentMethod: {
      type: String,
      enum: [
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Paytm Wallet",
        "PhonePe",
        "Google Pay",
        "Amazon Pay",
        "Cash",
        "Other",
      ],
      default: "UPI",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,

      validate: {
        validator: function (value) {
          const selectedDate = new Date(value);

          // Convert selected date to YYYY-MM-DD using UTC
          // because HTML date inputs send YYYY-MM-DD.
          const selectedYear = selectedDate.getUTCFullYear();
          const selectedMonth = String(
            selectedDate.getUTCMonth() + 1
          ).padStart(2, "0");
          const selectedDay = String(
            selectedDate.getUTCDate()
          ).padStart(2, "0");

          const selected = `${selectedYear}-${selectedMonth}-${selectedDay}`;

          // Get today's local calendar date
          const now = new Date();

          const todayYear = now.getFullYear();
          const todayMonth = String(now.getMonth() + 1).padStart(2, "0");
          const todayDay = String(now.getDate()).padStart(2, "0");

          const today = `${todayYear}-${todayMonth}-${todayDay}`;

          return selected <= today;
        },

        message: "Start date cannot be in the future",
      },
    },

    renewalDate: {
      type: Date,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


// Automatically calculate renewal date
subscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);

    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Mark subscription as expired if renewal date has already passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});


export const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);