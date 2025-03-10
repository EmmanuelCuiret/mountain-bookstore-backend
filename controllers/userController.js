const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {

    //Connexion d'un utilisateur
    //Création d'un token
    static async getUserByLogin(req, res) {
        //console.log("➡️ Requête reçue sur /api/login avec :", req.body);
        try {
            const { login, password } = req.body;
    
            if (!login || !password) {
                //console.log("❌ Login ou mot de passe manquant !");
                return res.status(400).json({ message: "Login and password are required" });
            }
    
            //console.log("🔎 Recherche de l'utilisateur dans la DB...");
            const user = await User.getUserByLogin(login);
            //console.log("🟢 Utilisateur trouvé :", user);
    
            if (!user) {
                //console.log("❌ Utilisateur non trouvé !");
                return res.status(404).json({ message: "User not found" });
            }
    
            //console.log("🔑 Vérification du mot de passe...");
            const passwordMatch = await bcrypt.compare(password, user.password);
            //console.log("🟢 Résultat du hash :", passwordMatch);
    
            if (!passwordMatch) {
                //console.log("❌ Mot de passe invalide !");
                return res.status(401).json({ message: "Invalid password" });
            }
    
            //console.log("✅ Utilisateur authentifié !");
            
            const token = jwt.sign(
                { userId: user.id, login: user.login },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
    
            //console.log("🔑 Token généré :", token);
            res.json({ token });
    
        } catch (error) {
            //console.error("❌ Erreur serveur :", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    //Création d'un utilisateur
    static async createUser(req, res) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({ message: "Login and password are required" });
            }

            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            const userId = await User.createUser(login, hashedPassword);

            res.status(201).json({ message: "User created", userId });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

module.exports = UserController;