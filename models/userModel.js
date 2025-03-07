const db = require('../config/db');

class User {
    static async getUserByLogin(login) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE login = ?", [login]);
            console.log("Résultat SQL : ", rows);
            return rows[0];
        } catch (error) {
            console.log('Erreur SQL: ', error);
            throw error;
        }
    }

    static async createUser(login, password) {
        const [result] = await db.query("INSERT INTO users (login, password) VALUES (?, ?)", [login, password]);
        return result.insertId;
    }
}

module.exports = User;