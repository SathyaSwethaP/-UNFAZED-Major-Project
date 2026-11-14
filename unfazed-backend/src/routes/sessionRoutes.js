const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createSession,
    getMySessions,
    getSessionById,
    updateSession,
    deleteSession
} = require("../controllers/sessionController");

router.post("/", authMiddleware, createSession);

router.get("/", authMiddleware, getMySessions);

router.get("/:id", authMiddleware, getSessionById);

router.put("/:id", authMiddleware, updateSession);

router.delete("/:id", authMiddleware, deleteSession);

module.exports = router;