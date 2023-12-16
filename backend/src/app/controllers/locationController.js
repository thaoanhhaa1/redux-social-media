const LocationModel = require('../models/locationModel');

module.exports = {
    getLocations: async (req, res, next) => {
        const v = req.query.v ?? '';
        const regex = new RegExp(v, 'i');

        try {
            const locations = await LocationModel.find({
                $or: [
                    {
                        title: regex,
                    },
                    {
                        description: regex,
                    },
                ],
            });

            res.json(locations);
        } catch (error) {
            next(error);
        }
    },
};
