const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createAppointment,
    getMyAppointments,
    updateAppointmentStatus
} = require("../controllers/appointmentController");

router.post("/", createAppointment);

router.get("/my-appointments", authMiddleware, getMyAppointments);

router.patch("/:id/status", authMiddleware, updateAppointmentStatus);

module.exports = router;