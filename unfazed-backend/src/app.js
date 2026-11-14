const express = require("express");
const cors = require("cors");

const app = express();

const therapistRoutes = require("./routes/therapistRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const clientRoutes = require("./routes/clientRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const packageRoutes = require("./routes/packageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { handleRazorpayWebhook } = require("./controllers/webhookController");
const clinicalNoteRoutes = require("./routes/clinicalNoteRoutes");
app.use(cors());
app.post(
    "/api/webhooks/razorpay",
    express.raw({ type: "application/json" }),
    handleRazorpayWebhook
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/therapists", therapistRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/clinical-notes", clinicalNoteRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Unfazed API",
        status: "Server is running successfully"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Unfazed backend is healthy"
    });
});

module.exports = app;