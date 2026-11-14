const mongoose = require("mongoose");

const clinicalNoteSchema = new mongoose.Schema(
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
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            default: null
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: [
                "initial-assessment",
                "progress-note",
                "treatment-plan",
                "follow-up",
                "other"
            ],
            default: "progress-note"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("ClinicalNote", clinicalNoteSchema);