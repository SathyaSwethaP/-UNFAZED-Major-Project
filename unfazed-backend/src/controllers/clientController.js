const Client = require("../models/Client");

const createClient = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            age,
            gender,
            reasonForConsultation,
            concerns,
            goals,
            notes
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Client name and email are required"
            });
        }

        const client = await Client.create({
            therapist: req.user.id,
            name,
            email,
            phone,
            age,
            gender,
            reasonForConsultation,
            concerns,
            goals,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Client created successfully",
            client
        });

    } catch (error) {
        console.error("Create Client Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getMyClients = async (req, res) => {
    try {
        const clients = await Client.find({
            therapist: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: clients.length,
            clients
        });

    } catch (error) {
        console.error("Get Clients Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await Client.findOne({
            _id: req.params.id,
            therapist: req.user.id
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        res.status(200).json({
            success: true,
            client
        });

    } catch (error) {
        console.error("Get Client Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateClient = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "email",
            "phone",
            "age",
            "gender",
            "reasonForConsultation",
            "concerns",
            "goals",
            "notes",
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

        const client = await Client.findOneAndUpdate(
            {
                _id: req.params.id,
                therapist: req.user.id
            },
            {
                $set: updates
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Client updated successfully",
            client
        });

    } catch (error) {
        console.error("Update Client Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({
            _id: req.params.id,
            therapist: req.user.id
        });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Client deleted successfully"
        });

    } catch (error) {
        console.error("Delete Client Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createClient,
    getMyClients,
    getClientById,
    updateClient,
    deleteClient
};