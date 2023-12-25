const express = require('express');
const followController = require('../app/controllers/followController');

const router = express.Router();

router.get('/count', followController.countFollow);
router.get('/who-to-follow', followController.whoToFollow);
router.get('/count-who-to-follow', followController.countWhoToFollow);
router.get('/friends', followController.friends);
router.post('/follow', followController.follow);
router.post('/unfollow', followController.unfollow);

module.exports = router;
