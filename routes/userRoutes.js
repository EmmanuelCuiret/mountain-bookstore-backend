const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login/:login', userController.getUserByLogin);
router.post('/', userController.createUser);

module.exports = router;