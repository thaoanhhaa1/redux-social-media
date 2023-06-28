const express = require('express')
const usersController = require('../app/controllers/usersController')

const router = express.Router();

router.get('/get-user', usersController.getUser);
router.post('/edit-profile', usersController.editProfile);

module.exports = router;