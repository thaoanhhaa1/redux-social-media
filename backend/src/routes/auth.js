const express = require('express');
const authController = require('../app/controllers/authController');
const authMiddleware = require('../app/middlewares/authMiddleware');

const router = express.Router();

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.post('/sign-out', authMiddleware, authController.signOut);

module.exports = router;
