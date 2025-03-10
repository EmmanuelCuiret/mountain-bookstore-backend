const { executeQuery } = require("../services/apiService");

class User {
    static getUserByLogin(login) {
        const sql = "SELECT * FROM users WHERE login = ?";
        console.log("🟡 Exécution de la requête :", sql, "avec", login);
        return executeQuery(sql, [login])
            .then(rows => {
                console.log("🟢 Résultat de la requête :", rows);
                return rows[0];
            })
            .catch(error => {
                console.error("🔴 Erreur lors de l'exécution de la requête :", error);
                throw error;
            });
    }

    static createUser(login, password) {
        const sql = "INSERT INTO users (login, password) VALUES (?, ?)";
        return executeQuery(sql, [login, password]).then(result => result.insertId);
    }
}

module.exports = User;