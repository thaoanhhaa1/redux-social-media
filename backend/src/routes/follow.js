const express = require('express')
const followController = require('../app/controllers/followController')

const router = express.Router();

router.get('/count', followController.countFollow)
router.get('/who-to-follow', followController.whoToFollow)

module.exports = router