module.exports = (err, req, res, next) => {
    console.error("❌ Erreur interceptée :", err.stack);

    // 🔹 Ajoute les en-têtes CORS pour éviter les erreurs liées aux requêtes bloquées
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    res.status(500).json({ message: err.message || "An error has occurred!" });
};