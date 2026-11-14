const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    setAvailability,
    getAvailability
} = require("../controllers/availabilityController");

router.post("/", authMiddleware, setAvailability);
router.get("/", authMiddleware, getAvailability);

module.exports = router;