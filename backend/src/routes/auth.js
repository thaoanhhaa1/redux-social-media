const express = require('express')
const authController = require('../app/controllers/authController')

const router = express.Router();

router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)

module.exports = router