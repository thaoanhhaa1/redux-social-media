const express = require('express');
const listsController = require('../app/controllers/listsController');

const router = express.Router();

router.post('/add', listsController.add);
router.post('/remove', listsController.remove);
router.patch('/users/:user_id/pin', listsController.togglePin);
router.get('/users', listsController.getUsers);
router.get('/users/count', listsController.countPages);

module.exports = router;
