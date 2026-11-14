const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createPackage,
    getMyPackages,
    updatePackage,
    deletePackage
} = require("../controllers/packageController");

router.post("/", authMiddleware, createPackage);
router.get("/", authMiddleware, getMyPackages);
router.put("/:id", authMiddleware, updatePackage);
router.delete("/:id", authMiddleware, deletePackage);

module.exports = router;