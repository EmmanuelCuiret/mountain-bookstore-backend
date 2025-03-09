const { executeQuery } = require("../services/apiService");

class ProjectModel {
    static getAllProjects() {
        const sql = `
      SELECT p.id, p.title, p.author, COUNT(c.id) AS candidate_count
      FROM projects p
      LEFT JOIN candidates c ON p.id = c.project_id
      GROUP BY p.id, p.title, p.author;
    `;
        return executeQuery(sql);
    }

    static getProjectById(id) {
        const sql = `SELECT id, title, author, description, technologies FROM projects WHERE id = ?`;
        return executeQuery(sql, [id]);
    }

    static createProject(title, description, author, technologies) {
        const sql = `INSERT INTO projects (title, description, author, technologies) VALUES (?, ?, ?, ?)`;
        return executeQuery(sql, [title, description, author, technologies]);
    }

    static updateProject(id, title, author, description, technologies) {
        const sql = `UPDATE projects SET title = ?, author = ?, description = ?, technologies = ? WHERE id = ?`;
        return executeQuery(sql, [title, author, description, technologies, id]);
    }

    static deleteProject(id) {
        const sql = `DELETE FROM projects WHERE id = ?`;
        return executeQuery(sql, [id]);
    }

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
}

module.exports = ProjectModel;