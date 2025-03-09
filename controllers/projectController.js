const ProjectModel = require("../models/projectModel");

class ProjectController {
    static async getAllProjects(req, res) {
        try {
            const projects = await ProjectModel.getAllProjects();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

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

    static async getProjectCandidates(req, res) {
        try {
            const candidates = await ProjectModel.getProjectCandidates(req.params.id);
            res.json(candidates);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectController;