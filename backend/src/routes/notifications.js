const express = require('express');
const notificationController = require('../app/controllers/notificationController');
const router = express.Router();

router.delete(
    '/:notification_id',
    notificationController.deleteNotificationItem,
);
router.get('/', notificationController.getMyNotifications);

module.exports = router;
