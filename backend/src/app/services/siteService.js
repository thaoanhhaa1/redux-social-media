const { default: axios } = require('axios');
const userModel = require('../models/userModel');

module.exports = {
    search: (_id, value, skip, limit) => {
        const regex = new RegExp(value, 'i');

        return userModel
            .find(
                {
                    $and: [
                        {
                            $or: [
                                {
                                    username: regex,
                                },
                                {
                                    email: regex,
                                },
                                {
                                    name: regex,
                                },
                            ],
                        },
                        {
                            _id: {
                                $ne: _id,
                            },
                        },
                    ],
                },
                {
                    password: 0,
                    deleted: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                },
            )
            .skip(skip)
            .limit(limit);
    },

    gifs: (offset, limit, search) =>
        axios.get(
            `https://api.giphy.com/v1/gifs/${
                search ? 'search' : 'trending'
            }?api_key=${process.env.GIPHY_APY_KEY}${
                search ? `&q=${search}` : ''
            }&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`,
        ),
};
