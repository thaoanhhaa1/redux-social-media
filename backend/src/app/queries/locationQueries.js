const lookupLocation = [
    {
        $lookup: {
            from: 'locations',
            as: 'location',
            let: { location: '$location' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: [{ $toString: '$_id' }, '$$location'],
                        },
                    },
                },
            ],
        },
    },
    {
        $addFields: {
            location: {
                $ifNull: [{ $arrayElemAt: ['$location', 0] }, null],
            },
        },
    },
];

module.exports = { lookupLocation };
