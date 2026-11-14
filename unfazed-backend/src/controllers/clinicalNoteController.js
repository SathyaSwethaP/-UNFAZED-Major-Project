const ClinicalNote = require("../models/ClinicalNote");
const Client = require("../models/Client");
const Session = require("../models/Session");

const createClinicalNote = async (req, res) => {
    try {
        const { clientId, sessionId, title, content, category } = req.body;

        if (!clientId || !title || !content) {
            return res.status(400).json({
                success: false,
                message: "Client, title and content are required"
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

        if (sessionId) {
            const session = await Session.findOne({
                _id: sessionId,
                client: clientId,
                therapist: req.user.id
            });

            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: "Session not found"
                });
            }
        }

        const note = await ClinicalNote.create({
            therapist: req.user.id,
            client: clientId,
            session: sessionId || null,
            title,
            content,
            category
        });

        res.status(201).json({
            success: true,
            message: "Clinical note created successfully",
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getClinicalNotes = async (req, res) => {
    try {
        const notes = await ClinicalNote.find({
            therapist: req.user.id
        })
            .populate("client", "name email")
            .populate("session", "sessionDate duration")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getClientClinicalNotes = async (req, res) => {
    try {
        const notes = await ClinicalNote.find({
            therapist: req.user.id,
            client: req.params.clientId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateClinicalNote = async (req, res) => {
    try {
        const allowedFields = ["title", "content", "category"];
        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const note = await ClinicalNote.findOneAndUpdate(
            {
                _id: req.params.id,
                therapist: req.user.id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Clinical note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinical note updated successfully",
            note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteClinicalNote = async (req, res) => {
    try {
        const note = await ClinicalNote.findOneAndDelete({
            _id: req.params.id,
            therapist: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Clinical note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinical note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createClinicalNote,
    getClinicalNotes,
    getClientClinicalNotes,
    updateClinicalNote,
    deleteClinicalNote
};