const pool = require('../config/db');

async function executeQuery(sql, params = []) {
    try {
        console.log("🟡 executeQuery() - SQL:", sql);
        console.log("🟡 executeQuery() - Params:", params);

        const [rows] = await pool.query(sql, params);

        console.log("🟢 executeQuery() - Résultat :", rows);
        return rows;
    } catch (error) {
        console.error("🔴 Erreur dans executeQuery :", error);
        throw error;
    }
}

module.exports = { executeQuery };