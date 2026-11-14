const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
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

        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            default: null
        },

        sessionDate: {
            type: Date,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        sessionType: {
            type: String,
            enum: ["online", "in-person"],
            default: "online"
        },

        summary: {
            type: String,
            default: ""
        },

        therapistNotes: {
            type: String,
            default: ""
        },

        followUpRequired: {
            type: Boolean,
            default: false
        },

        followUpDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled"],
            default: "scheduled"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Session", sessionSchema);