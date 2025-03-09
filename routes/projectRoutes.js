const express = require("express");
const ProjectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Charge tous les projets
router.get("/projects", authMiddleware, ProjectController.getAllProjects);

// 📌 Charge un projet
router.get("/project/:id", authMiddleware, ProjectController.getProjectById);

// 📌 Ajoute un nouveau projet
router.post("/add-project", authMiddleware, ProjectController.createProject);

// 📌 Met à jour un projet
router.patch("/project/:id", authMiddleware, ProjectController.updateProject);

// 📌 Efface un projet
router.delete("/project/:id", authMiddleware, ProjectController.deleteProject);

module.exports = router;