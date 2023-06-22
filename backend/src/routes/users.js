const express = require('express')
const usersController = require('../app/controllers/usersController')

const router = express.Router();

router.post('/sign-up', usersController.signUp);

module.exports = router;