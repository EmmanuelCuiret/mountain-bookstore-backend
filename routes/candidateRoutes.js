const express = require("express");
const router = express.Router();
const CandidateController = require("../controllers/candidateController");
const authMiddleware = require("../middlewares/authMiddleware");

// 📌 Récupérer les candidats d'un projet
router.get("/project/:id/candidates", authMiddleware, CandidateController.getCandidatesByProject);

// 📌 Ajouter un candidat à un projet
router.post("/project/:id/add-candidate", authMiddleware, CandidateController.addCandidate);

// 📌 Supprimer un candidat d'un projet
router.delete("/project/candidate/:id", authMiddleware, CandidateController.deleteCandidate);

module.exports = router;