const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
    registerTherapist,
    getTherapistBySlug,
    loginTherapist,
    getMyProfile,
    updateMyProfile
} = require("../controllers/therapistController");

router.post("/register", registerTherapist);
router.post("/login", loginTherapist);
router.get("/my-profile", authMiddleware, getMyProfile);
router.put("/my-profile", authMiddleware, updateMyProfile);
router.get("/verify-token", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is valid. Authentication successful.",
        user: req.user
    });
});

router.get("/:slug", getTherapistBySlug);

module.exports = router;