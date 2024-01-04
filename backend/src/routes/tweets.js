const express = require('express');
const tweetController = require('../app/controllers/tweetController');
const commentsController = require('../app/controllers/commentsController');

const router = express.Router();

// comments
router.get('/:tweet_id/comments', commentsController.getAll);
router.post('/:tweet_id/comments', commentsController.post);
router.put('/:tweet_id/comments/:comment_id', commentsController.put);
router.patch('/:tweet_id/comments/:comment_id', commentsController.patch);
router.delete('/:tweet_id/comments/:comment_id', commentsController.delete);

// ENDPOINT: /api/private/tweets
router.get('/count', tweetController.count);
router.get('/get-my-tweets', tweetController.getMyTweets);
router.get('/get-following-tweets', tweetController.getFollowingTweets);
router.get('/count-following-tweets', tweetController.countFollowingTweets);
router.post('/toggle-like', tweetController.toggleLike);
router.post('/:tweet_id/not-interested', tweetController.notInterested);
router.post('/:tweet_id/interested', tweetController.interested);
router.post('/', tweetController.createTweet);

module.exports = router;
