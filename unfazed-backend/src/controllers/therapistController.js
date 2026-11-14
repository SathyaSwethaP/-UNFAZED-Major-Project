const Therapist = require("../models/Therapist");
const generateSlug = require("../utils/generateSlug");
const bcrypt = require("bcryptjs");

const registerTherapist = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            bio,
            specializations,
            languages
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingTherapist = await Therapist.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingTherapist) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const password_hash = await bcrypt.hash(password, 12);

        let slug = generateSlug(name);

        if (!slug) {
            slug = "therapist";
        }

        let uniqueSlug = slug;
        let counter = 1;

        while (await Therapist.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }

        const therapist = await Therapist.create({
            name,
            email,
            password_hash,
            slug: uniqueSlug,
            bio,
            specializations,
            languages
        });

        res.status(201).json({
            success: true,
            message: "Therapist registered successfully",
            therapist: {
                id: therapist._id,
                name: therapist.name,
                email: therapist.email,
                slug: therapist.slug,
                bio: therapist.bio,
                specializations: therapist.specializations,
                languages: therapist.languages
            }
        });

    } catch (error) {
        console.error("Therapist Registration Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getTherapistBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const therapist = await Therapist.findOne({ slug })
            .select("-password_hash");

        if (!therapist) {
            return res.status(404).json({
                success: false,
                message: "Therapist not found"
            });
        }

        res.status(200).json({
            success: true,
            therapist
        });

    } catch (error) {
        console.error("Get Therapist Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const loginTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const therapist = await Therapist.findOne({
            email: email.trim().toLowerCase()
        }).select("+password_hash");

        if (!therapist) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            therapist.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = require("jsonwebtoken").sign(
            {
                id: therapist._id,
                email: therapist.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            therapist: {
                id: therapist._id,
                name: therapist.name,
                email: therapist.email,
                slug: therapist.slug
            }
        });

    } catch (error) {
        console.error("Therapist Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const therapist = await Therapist.findById(req.user.id)
            .select("-password_hash");

        if (!therapist) {
            return res.status(404).json({
                success: false,
                message: "Therapist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Therapist profile retrieved successfully",
            therapist
        });

    } catch (error) {
        console.error("Get My Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const { name, bio, specializations, languages } = req.body;

        const updatedTherapist = await Therapist.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    ...(name !== undefined && { name }),
                    ...(bio !== undefined && { bio }),
                    ...(specializations !== undefined && { specializations }),
                    ...(languages !== undefined && { languages })
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password_hash");

        if (!updatedTherapist) {
            return res.status(404).json({
                success: false,
                message: "Therapist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            therapist: updatedTherapist
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    registerTherapist,
    getTherapistBySlug,
    loginTherapist,
    getMyProfile,
    updateMyProfile
};