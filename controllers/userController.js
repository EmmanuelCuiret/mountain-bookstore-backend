const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    static async getUserByLogin(req, res) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({ message: "Login and password are required" });
            }

            const user = await User.getUserByLogin(login);

            if (!user) return res.status(404).json({ message: "User not found" });

            // Vérification du mot de passe hashé
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Générer un token
            const token = jwt.sign(
                { userId: user.id, login: user.login },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ token });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

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