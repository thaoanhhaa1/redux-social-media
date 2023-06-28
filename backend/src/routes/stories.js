const express = require('express');
const storiesController = require('../app/controllers/storiesController')

const router = express.Router();

router.get('/get-my-stories', storiesController.getMyStories);

module.exports = router;