const Package = require("../models/Package");

const createPackage = async (req, res) => {
    try {
        const {
            name,
            description,
            sessionsIncluded,
            price,
            currency,
            validityDays
        } = req.body;

        if (!name || !sessionsIncluded || price === undefined || !validityDays) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required package details"
            });
        }

        const newPackage = await Package.create({
            therapist: req.user.id,
            name,
            description,
            sessionsIncluded,
            price,
            currency,
            validityDays
        });

        res.status(201).json({
            success: true,
            message: "Package created successfully",
            package: newPackage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyPackages = async (req, res) => {
    try {
        const packages = await Package.find({
            therapist: req.user.id
        });

        res.status(200).json({
            success: true,
            count: packages.length,
            packages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatePackage = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "description",
            "sessionsIncluded",
            "price",
            "currency",
            "validityDays",
            "isActive"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const updatedPackage = await Package.findOneAndUpdate(
            {
                _id: req.params.id,
                therapist: req.user.id
            },
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Package updated successfully",
            package: updatedPackage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deletePackage = async (req, res) => {
    try {
        const deletedPackage = await Package.findOneAndDelete({
            _id: req.params.id,
            therapist: req.user.id
        });

        if (!deletedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Package deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPackage,
    getMyPackages,
    updatePackage,
    deletePackage
};


