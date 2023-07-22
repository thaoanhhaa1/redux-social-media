const router = require('express').Router();
const locationController = require('../app/controllers/locationController');

router.get('/', locationController.getLocations);

module.exports = router;
