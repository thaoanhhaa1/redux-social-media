const express = require('express');
const tweetController = require('../app/controllers/tweetController')

const router = express.Router();

router.get('/count', tweetController.count)
router.get('/get-my-tweets', tweetController.getMyTweets)

module.exports = router