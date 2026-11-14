const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        therapist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true
        },
        razorpayOrderId: {
            type: String,
            required: true,
            unique: true
        },
        razorpayPaymentId: {
            type: String,
            default: null
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            default: "INR"
        },
        status: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending"
        },
        paymentMethod: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", paymentSchema);