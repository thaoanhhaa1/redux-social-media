const express = require('express')
const sitesController = require('../app/controllers/sitesController')

const router = express.Router()

router.get('/search/:search', sitesController.search)

module.exports = router;