const { executeQuery } = require("../services/apiService");

class User {
    static getUserByLogin(login) {
        const sql = "SELECT * FROM users WHERE login = ?";
        return executeQuery(sql, [login]).then(rows => rows[0]);
    }

    static createUser(login, password) {
        const sql = "INSERT INTO users (login, password) VALUES (?, ?)";
        return executeQuery(sql, [login, password]).then(result => result.insertId);
    }
}

module.exports = User;