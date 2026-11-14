const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
    {
        therapist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true,
            unique: true
        },

        availability: [
            {
                day: {
                    type: String,
                    enum: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                    ],
                    required: true
                },

                slots: [
                    {
                        startTime: {
                            type: String,
                            required: true
                        },

                        endTime: {
                            type: String,
                            required: true
                        }
                    }
                ],

                isAvailable: {
                    type: Boolean,
                    default: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "TherapistAvailability",
    availabilitySchema
);