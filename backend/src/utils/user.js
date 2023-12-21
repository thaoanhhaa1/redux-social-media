const user = {
    tagPeople: {
        $lookup: {
            from: 'users',
            as: 'tagPeople',
            let: { tagPeople: '$tagPeople' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: [
                                { $toString: '$_id' },
                                { $ifNull: ['$$tagPeople', []] },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        name: 1,
                        username: 1,
                        avatar: 1,
                    },
                },
            ],
        },
    },
};

module.exports = user;
