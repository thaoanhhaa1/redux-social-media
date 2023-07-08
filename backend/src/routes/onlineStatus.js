const express = require('express');
const onlineStatusController = require('../app/controllers/onlineStatusController');

const router = express.Router();

router.post('/', onlineStatusController.updateOnlineStatus);

module.exports = router;
