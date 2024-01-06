const express = require('express');
const usersController = require('../app/controllers/usersController');

const router = express.Router();

router.get('/get-user', usersController.getUser);
router.get('/get-users-online', usersController.getContactUsers);
router.get('/:user_id/tweets', usersController.getTweetsByUser);
router.post('/edit-profile', usersController.editProfile);

module.exports = router;
