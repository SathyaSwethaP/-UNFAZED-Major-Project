const crypto = require("crypto");
const Payment = require("../models/Payment");

const handleRazorpayWebhook = async (req, res) => {
    try {
        const webhookSignature = req.headers["x-razorpay-signature"];

        if (!webhookSignature || !Buffer.isBuffer(req.body)) {
            return res.status(400).json({
                success: false,
                message: "Invalid webhook request"
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(req.body)
            .digest("hex");

        const receivedBuffer = Buffer.from(webhookSignature, "hex");
        const expectedBuffer = Buffer.from(expectedSignature, "hex");

        if (
            receivedBuffer.length !== expectedBuffer.length ||
            !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid webhook signature"
            });
        }

        const eventData = JSON.parse(req.body.toString());

        const event = eventData.event;

        const paymentEntity = eventData.payload?.payment?.entity;

        if (!paymentEntity) {
            return res.status(200).json({
                success: true,
                message: "Webhook received"
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: paymentEntity.order_id
        });

        if (
    paymentEntity.amount !== Math.round(payment.amount * 100) ||
    paymentEntity.currency !== payment.currency
) {
    return res.status(400).json({
        success: false,
        message: "Payment amount or currency mismatch"
    });
}

        if (!payment) {
            return res.status(200).json({
                success: true,
                message: "Payment record not found"
            });
        }

        if (event === "payment.captured") {
            payment.razorpayPaymentId = paymentEntity.id;
            payment.paymentMethod = paymentEntity.method || "";
            payment.status = "paid";

            await payment.save();
        }

        if (event === "payment.failed" && payment.status !== "paid") {
            payment.razorpayPaymentId = paymentEntity.id;
            payment.paymentMethod = paymentEntity.method || "";
            payment.status = "failed";

            await payment.save();
        }

        res.status(200).json({
            success: true,
            message: "Webhook processed successfully"
        });

    } catch (error) {
        console.error("Razorpay Webhook Error:", error);

        res.status(500).json({
            success: false,
            message: "Webhook processing failed"
        });
    }
};

module.exports = {
    handleRazorpayWebhook
};