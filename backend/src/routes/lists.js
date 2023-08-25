const express = require('express');
const listsController = require('../app/controllers/listsController');

const router = express.Router();

router.post('/add', listsController.add);
router.post('/remove', listsController.remove);

module.exports = router;
