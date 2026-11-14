const TherapistAvailability = require("../models/TherapistAvailability");

const setAvailability = async (req, res) => {
    try {
        const { availability } = req.body;

        if (!Array.isArray(availability)) {
            return res.status(400).json({
                success: false,
                message: "Availability must be an array"
            });
        }

        const updatedAvailability =
            await TherapistAvailability.findOneAndUpdate(
                { therapist: req.user.id },
                {
                    $set: {
                        availability
                    }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

        res.status(200).json({
            success: true,
            message: "Availability saved successfully",
            data: updatedAvailability
        });

    } catch (error) {
        console.error("Set Availability Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getAvailability = async (req, res) => {
    try {
        const availability = await TherapistAvailability.findOne({
            therapist: req.user.id
        });

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability retrieved successfully",
            data: availability
        });

    } catch (error) {
        console.error("Get Availability Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    setAvailability,
    getAvailability
};