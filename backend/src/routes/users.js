const express = require('express');
const usersController = require('../app/controllers/usersController');
const tweetController = require('../app/controllers/tweetController');

const router = express.Router();

router.get('/get-user', usersController.getUser);
router.get('/get-users-online', usersController.getContactUsers);
router.get('/:user_id/tweets/:tweet_id', tweetController.getTweet);
router.get('/:user_id/tweets', usersController.getTweetsByUser);
router.post('/edit-profile', usersController.editProfile);

module.exports = router;
