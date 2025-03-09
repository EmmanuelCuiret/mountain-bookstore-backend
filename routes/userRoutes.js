const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 📌 Logue un utilisateur
router.post('/login', userController.getUserByLogin);

// 📌 Créé un utilisateur (non utilisé)
router.post('/', userController.createUser);

module.exports = router;