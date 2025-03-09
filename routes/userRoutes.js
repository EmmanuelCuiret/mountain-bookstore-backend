const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 📌 Logue un utilisateur
router.get('/login', userController.getUserByLogin);

// 📌 Créé un utilisateur (non utilisé)
router.post('/', userController.createUser);

module.exports = router;