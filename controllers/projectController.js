const ProjectModel = require("../models/projectModel");

class ProjectController {

    //Récupération de tous les projets 
    static async getAllProjects(req, res) {
        try {
            const projects = await ProjectModel.getAllProjects();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Récupération d'un projet en particulier
    static async getProjectById(req, res) {
        try {
            const project = await ProjectModel.getProjectById(req.params.id);
            if (project.length === 0) {
                return res.status(404).json({ error: "Project not found" });
            }
            res.json(project[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Création d'un projet
    static async createProject(req, res) {
        const { title, description, author, technologies } = req.body;
        if (!title || !description || !author) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            await ProjectModel.createProject(title, description, author, technologies);
            res.status(201).json({ message: "Project created successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Mise à jour d'un projet
    static async updateProject(req, res) {
        try {
            const { title, author, description, technologies } = req.body;
            const result = await ProjectModel.updateProject(req.params.id, title, author, description, technologies);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Project not found" });
            }
            res.json({ message: "Project updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Effacement d'un projet
    static async deleteProject(req, res) {
        try {
            const result = await ProjectModel.deleteProject(req.params.id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Project not found" });
            }
            res.json({ message: "Project deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Récupère les candidats d'un projet (l'auteur inclu)
    static async getProjectCandidates(req, res) {
        try {
            const candidates = await ProjectModel.getProjectCandidates(req.params.id);
            res.json(candidates);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Récupère les projets et leurs candidats
    static async getProjectsWithCandidates(req, res) {
        try {
            console.log("➡️ Requête reçue sur /projects-with-candidates");
            const results = await ProjectModel.getProjectsWithCandidates();
            console.log("✅ Résultat obtenu :", results);

            // Regrouper les candidats par projet
            const projectsMap = new Map();
            results.forEach(row => {
                if (!projectsMap.has(row.id)) {
                    projectsMap.set(row.id, {
                        id: row.id,
                        title: row.title,
                        candidates: []
                    });
                }
                projectsMap.get(row.id).candidates.push(row.candidate_name);
            });

            res.json(Array.from(projectsMap.values()));
        } catch (error) {
            console.error("❌ Erreur dans ProjectController.getProjectsWithCandidates :", error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = ProjectController;