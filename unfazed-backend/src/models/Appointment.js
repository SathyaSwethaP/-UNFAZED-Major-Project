const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        therapist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        clientEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        clientPhone: {
            type: String,
            default: ""
        },
        appointmentDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending"
        },
        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);