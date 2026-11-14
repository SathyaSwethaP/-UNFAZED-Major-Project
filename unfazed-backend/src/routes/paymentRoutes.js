const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createPaymentOrder,
    verifyPayment,
    getPaymentHistory
} = require("../controllers/paymentController");

router.post("/create-order", authMiddleware, createPaymentOrder);

router.post("/verify", authMiddleware, verifyPayment);

router.get("/history", authMiddleware, getPaymentHistory);

module.exports = router;