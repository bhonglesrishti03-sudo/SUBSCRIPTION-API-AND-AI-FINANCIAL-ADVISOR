import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },


    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"]
    },


    currency: {
        type: String,
        enum: {
            values: [
                "INR",
                "USD",
                "EUR",
                "GBP",
                "JPY",
                "AUD",
                "CAD",
                "SGD"
            ],
            message: "{VALUE} is not a supported currency."
        },
        default: "INR",
        required: true
    },


    frequency: {
        type: String,
        enum: [
            "daily",
            "weekly",
            "monthly",
            "yearly"
        ],
        required: true
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
            "Other"
        ],
        default: "Other"
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
            "Other"
        ],
        default: "UPI",
        required: true
    },


    status: {
        type: String,
        enum: [
            "active",
            "cancelled",
            "expired"
        ],
        default: "active"
    },


   startDate: {
    type: Date,
    required: true,

    validate: {
  validator: function (value) {
    const selected = new Date(value).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    return selected <= today;
  },
  message: "Start date cannot be in the future",
}
},


    renewalDate: {

        type: Date,

    },


    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true

    }


},
{
    timestamps: true
});




// Automatically calculate renewal date

subscriptionSchema.pre("save", function() {


    if(!this.renewalDate) {


        const renewalPeriods = {

            daily: 1,

            weekly: 7,

            monthly: 30,

            yearly: 365

        };


        this.renewalDate = new Date(this.startDate);


        this.renewalDate.setDate(
            this.renewalDate.getDate() +
            renewalPeriods[this.frequency]
        );

    }



    // Expire subscription if renewal date has passed

    if(this.renewalDate < new Date()) {

        this.status = "expired";

    }



  

});




export const Subscription = mongoose.model(
    "Subscription",
    subscriptionSchema
);
//the example flow of the above data
/*
{
    "name": "Spotify",
    "startDate": "2026-07-10",
    "frequency": "weekly"
}
    Before middleware
{
    startDate: 10 July,
    frequency: "weekly",
    renewalDate: undefined
}

↓

Runs middleware

↓

Looks up

weekly → 7

↓

Adds 7 days

↓

Document becomes

{
    startDate: 10 July,
    frequency: "weekly",
    renewalDate: 17 July
}

↓

Now MongoDB saves it.

Why next()?

Think of middleware as a queue.

Save request
      ↓
Pre-save middleware
      ↓
next()
      ↓
Actually save to MongoDB

If you don't call next(), Mongoose doesn't know that your middleware has finished, and the save operation can hang or never complete (unless you're using an async middleware pattern).
*/