const { executeQuery } = require("../services/apiService");

class CandidateModel {
    static getCandidatesByProject(projectId) {
        const sql = `
            SELECT * FROM (
                SELECT 
                    p.id as id,
                    p.author AS candidate_name,  
                    NULL AS candidate_id         
                FROM projects p
                WHERE p.id = ?
                
                UNION ALL  

                SELECT 
                    p.id as id,
                    c.name AS candidate_name, 
                    c.id AS candidate_id
                FROM projects p
                JOIN candidates c ON p.id = c.project_id
            ) as combined_results
            WHERE id = ?
            ORDER BY candidate_id IS NULL DESC, candidate_id;
        `;
        return executeQuery(sql, [projectId, projectId]);
    }

    static addCandidate(projectId, candidateName) {
        const sql = "INSERT INTO candidates (name, project_id) VALUES (?, ?)";
        return executeQuery(sql, [candidateName, projectId]);
    }

    static deleteCandidate(candidateId) {
        const sql = "DELETE FROM candidates WHERE id = ?";
        return executeQuery(sql, [candidateId]);
    }
}

module.exports = CandidateModel;