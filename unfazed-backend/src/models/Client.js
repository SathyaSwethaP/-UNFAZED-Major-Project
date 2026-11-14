const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        therapist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            default: ""
        },

        age: {
            type: Number,
            default: null
        },

        gender: {
            type: String,
            default: ""
        },

        reasonForConsultation: {
            type: String,
            default: ""
        },

        concerns: {
            type: [String],
            default: []
        },

        goals: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Client", clientSchema);