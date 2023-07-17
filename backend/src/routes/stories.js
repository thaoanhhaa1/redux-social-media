const express = require('express');
const storiesController = require('../app/controllers/storiesController');

const router = express.Router();

router.get('/get-stories', storiesController.getStories);
router.post('/', storiesController.create);

module.exports = router;
