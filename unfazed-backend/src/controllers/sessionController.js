const Session = require("../models/Session");
const Client = require("../models/Client");
const Appointment = require("../models/Appointment");

const createSession = async (req, res) => {
    try {
        const {
            clientId,
            appointmentId,
            sessionDate,
            duration,
            sessionType,
            summary,
            therapistNotes,
            followUpRequired,
            followUpDate
        } = req.body;

        if (!clientId || !sessionDate || !duration) {
            return res.status(400).json({
                success: false,
                message: "Client, session date and duration are required"
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

        if (appointmentId) {
            const appointment = await Appointment.findOne({
                _id: appointmentId,
                therapist: req.user.id
            });

            if (!appointment) {
                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });
            }
        }

        const session = await Session.create({
            therapist: req.user.id,
            client: clientId,
            appointment: appointmentId || null,
            sessionDate,
            duration,
            sessionType,
            summary,
            therapistNotes,
            followUpRequired,
            followUpDate
        });

        res.status(201).json({
            success: true,
            message: "Session created successfully",
            session
        });

    } catch (error) {
        console.error("Create Session Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({
            therapist: req.user.id
        })
            .populate("client", "name email")
            .populate("appointment")
            .sort({ sessionDate: -1 });

        res.status(200).json({
            success: true,
            count: sessions.length,
            sessions
        });

    } catch (error) {
        console.error("Get Sessions Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getSessionById = async (req, res) => {
    try {
        const session = await Session.findOne({
            _id: req.params.id,
            therapist: req.user.id
        })
            .populate("client", "name email")
            .populate("appointment");

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            session
        });

    } catch (error) {
        console.error("Get Session Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateSession = async (req, res) => {
    try {
        const allowedFields = [
            "sessionDate",
            "duration",
            "sessionType",
            "summary",
            "therapistNotes",
            "followUpRequired",
            "followUpDate",
            "status"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update"
            });
        }

        const session = await Session.findOneAndUpdate(
            {
                _id: req.params.id,
                therapist: req.user.id
            },
            {
                $set: updates
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Session updated successfully",
            session
        });

    } catch (error) {
        console.error("Update Session Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteSession = async (req, res) => {
    try {
        const session = await Session.findOneAndDelete({
            _id: req.params.id,
            therapist: req.user.id
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Session deleted successfully"
        });

    } catch (error) {
        console.error("Delete Session Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createSession,
    getMySessions,
    getSessionById,
    updateSession,
    deleteSession
};