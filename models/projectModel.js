const { executeQuery } = require("../services/apiService");

class ProjectModel {

    //Récupération de la description de tous les projets
    static getAllProjects() {
        const sql = `
      SELECT p.id, p.title, p.author, COUNT(c.id) AS candidate_count
      FROM projects p
      LEFT JOIN candidates c ON p.id = c.project_id
      GROUP BY p.id, p.title, p.author;
    `;
        return executeQuery(sql);
    }

    //Récupère les données d'un projet
    static getProjectById(id) {
        const sql = `SELECT id, title, author, description, technologies FROM projects WHERE id = ?`;
        return executeQuery(sql, [id]);
    }

    //Création d'un projet
    static createProject(title, description, author, technologies) {
        const sql = `INSERT INTO projects (title, description, author, technologies) VALUES (?, ?, ?, ?)`;
        return executeQuery(sql, [title, description, author, technologies]);
    }

    //Mise à jour d'un projet
    static updateProject(id, title, author, description, technologies) {
        const sql = `UPDATE projects SET title = ?, author = ?, description = ?, technologies = ? WHERE id = ?`;
        return executeQuery(sql, [title, author, description, technologies, id]);
    }

    //Effacement d'un projet
    static deleteProject(id) {
        const sql = `DELETE FROM projects WHERE id = ?`;
        return executeQuery(sql, [id]);
    }

    //Récupère les candidats d'un projet (l'auteur inclu)
    static getProjectCandidates(projectId) {
        const sql = `
      SELECT * FROM (
        SELECT p.id, p.author AS candidate_name, NULL AS candidate_id
        FROM projects p WHERE p.id = ?
        UNION ALL
        SELECT p.id, c.name AS candidate_name, c.id AS candidate_id
        FROM projects p
        JOIN candidates c ON p.id = c.project_id
      ) AS combined_results
      WHERE id = ?
      ORDER BY candidate_id IS NULL DESC, candidate_id;
    `;
        return executeQuery(sql, [projectId, projectId]);
    }

    //Récupère les projets et leurs candidats
    // Récupération de tous les projets avec leurs candidats
    static async getProjectsWithCandidates() {
        const sql = `
            SELECT 
                p.id, 
                p.title, 
                p.author AS candidate_name,
                NULL AS candidate_id
            FROM projects p
            
            UNION ALL
            
            SELECT 
                p.id, 
                p.title, 
                c.name AS candidate_name, 
                c.id AS candidate_id
            FROM projects p
            JOIN candidates c ON p.id = c.project_id
            
            ORDER BY id, candidate_id IS NULL DESC, candidate_name;
        `;
        return executeQuery(sql);
    }
}

module.exports = ProjectModel;