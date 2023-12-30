const express = require('express');
const storiesController = require('../app/controllers/storiesController');

const router = express.Router();

router.get('/get-stories', storiesController.getStories);
router.get('/get-stories-group-user', storiesController.getStoriesGroupByUsers);
router.post('/', storiesController.create);

module.exports = router;
