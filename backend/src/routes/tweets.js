const express = require('express');
const tweetController = require('../app/controllers/tweetController');

const router = express.Router();

router.get('/count', tweetController.count);
router.get('/get-my-tweets', tweetController.getMyTweets);
router.get('/get-following-tweets', tweetController.getFollowingTweets);
router.post('/toggle-like', tweetController.toggleLike);
router.post('/', tweetController.createTweet);

module.exports = router;
