const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createClinicalNote,
    getClinicalNotes,
    getClientClinicalNotes,
    updateClinicalNote,
    deleteClinicalNote
} = require("../controllers/clinicalNoteController");

router.post("/", authMiddleware, createClinicalNote);

router.get("/", authMiddleware, getClinicalNotes);

router.get("/client/:clientId", authMiddleware, getClientClinicalNotes);

router.put("/:id", authMiddleware, updateClinicalNote);

router.delete("/:id", authMiddleware, deleteClinicalNote);

module.exports = router;