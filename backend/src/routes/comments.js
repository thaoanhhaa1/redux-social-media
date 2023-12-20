const express = require('express');
const commentsController = require('../app/controllers/commentsController');
const router = express.Router();

// ENDPOINT: /api/private/comments
router.get('/:comment_id/comments', commentsController.getAllByParent);
router.post('/:comment_id/toggle-like', commentsController.toggleLike);

module.exports = router;
