const crypto = require("crypto");

const Payment = require("../models/Payment");
const Package = require("../models/Package");
const Client = require("../models/Client");
const razorpay = require("../config/razorpay");

const createPaymentOrder = async (req, res) => {
    try {
        const { clientId, packageId } = req.body;

        if (!clientId || !packageId) {
            return res.status(400).json({
                success: false,
                message: "Client ID and Package ID are required"
            });
        }

        const client = await Client.findOne({
            _id: clientId,
            therapist: req.user.id
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        const selectedPackage = await Package.findOne({
            _id: packageId,
            therapist: req.user.id,
            isActive: true
        });

        if (!selectedPackage) {
            return res.status(404).json({
                success: false,
                message: "Active package not found"
            });
        }

        const options = {
            amount: Math.round(selectedPackage.price * 100),
            currency: selectedPackage.currency,
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        const payment = await Payment.create({
            therapist: req.user.id,
            client: clientId,
            package: packageId,
            razorpayOrderId: order.id,
            amount: selectedPackage.price,
            currency: selectedPackage.currency,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Payment order created successfully",
            order,
            payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification details are required"
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
            therapist: req.user.id
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment order not found"
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const signatureBuffer = Buffer.from(razorpay_signature);
        const expectedBuffer = Buffer.from(expectedSignature);

        if (
            signatureBuffer.length !== expectedBuffer.length ||
            !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        const razorpayPayment = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        if (
            razorpayPayment.order_id !== razorpay_order_id ||
            razorpayPayment.status !== "captured" ||
            razorpayPayment.amount !== Math.round(payment.amount * 100) ||
            razorpayPayment.currency !== payment.currency
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details could not be verified"
            });
        }

        if (payment.status === "paid") {
            return res.status(200).json({
                success: true,
                message: "Payment already verified"
            });
        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.paymentMethod = razorpayPayment.method || "";
        payment.status = "paid";

        await payment.save();

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({
            therapist: req.user.id
        })
            .populate("client", "name email")
            .populate("package", "name price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPaymentOrder,
    verifyPayment,
    getPaymentHistory
};