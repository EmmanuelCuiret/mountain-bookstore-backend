const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "185.207.226.9",
    user: "ManuDb",
    password: "N9_6n!V5Dl-sw3P*",
    database: "ManuDb",
});

connection.connect(err => {
    if (err) {
        console.error("🔴 Erreur de connexion :", err.stack);
        return;
    }
    console.log("✅ Connecté à la DB");
});

connection.query("SELECT * FROM users WHERE login = 'becode'", (error, results) => {
    if (error) {
        console.error("🔴 Erreur SQL :", error.sqlMessage);
    } else {
        console.log("🟢 Résultat :", results);
    }
    connection.end();
});
