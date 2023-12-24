const userModel = require('../models/userModel');

module.exports = {
    findById: (_id) => userModel.findOne({ _id }),
    findDTOById: (_id) =>
        userModel.findOne(
            { _id },
            {
                name: 1,
                avatar: 1,
                username: 1,
            },
        ),
    findUserIdTodayBirthday: () => {
        const date = new Date();

        return userModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $dayOfMonth: date },
                                    { $dayOfMonth: '$birthday' },
                                ],
                            },
                            {
                                $eq: [
                                    { $month: date },
                                    { $month: '$birthday' },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                },
            },
        ]);
    },
};
