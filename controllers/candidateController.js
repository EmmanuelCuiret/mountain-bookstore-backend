const Candidate = require("../models/candidateModel");

class CandidateController {

    //R2cupération des candidats d'un projet
    static async getCandidatesByProject(req, res) {
        try {
            const projectId = req.params.id;
            const candidates = await Candidate.getCandidatesByProject(projectId);
            res.json(candidates);
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    //Ajout d'un candidat à un projet
    static async addCandidate(req, res) {
        try {
            const projectId = req.params.id;
            const { candidateName } = req.body;

            if (!candidateName) {
                return res.status(400).json({ error: "Candidate name is required" });
            }

            const candidateId = await Candidate.addCandidate(projectId, candidateName);
            res.status(201).json({ message: "Candidate added successfully!", candidateId });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    //Suppression d'un candidat à un projet
    static async deleteCandidate(req, res) {
        try {
            const candidateId = req.params.id;
            const deleted = await Candidate.deleteCandidate(candidateId);

            if (!deleted) {
                return res.status(404).json({ error: "Candidate not found" });
            }

            res.status(200).json({ message: "Candidate deleted successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

}

module.exports = CandidateController;