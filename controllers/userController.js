const User = require('../models/userModel');

exports.getUserByLogin = async (req, res) => {
    try {
        const { login } = req.params;
        console.log("Login reçu :", login);
        if (!login) {
            return res.status(400).json({ message: 'Login is required' });
        }

        const user = await User.getUserByLogin(login);
        console.log("Utilisateur trouvé:", user);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);

    } catch (error) {
        console.error("Erreur dans getUserByLogin :", error);
        res.status(500).json({ message: "Server error: ", error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userId = await User.createUser(login, password);
        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        res.status(500).json({ message: "Server error: ", error });
    }
};