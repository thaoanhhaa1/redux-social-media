const cron = require('node-cron');

const { notificationType } = require('../../constants');
const { userService, notificationService } = require('../services');
const tokenModel = require('../models/tokenModel');
const trendingService = require('../services/trendingService');

// mm hh dd mm ww

module.exports = {
    birthdayTaskNotify: () => {
        const dailyTask = cron.schedule(
            '0 0 * * *',
            async () => {
                try {
                    const users = await userService.findUserIdTodayBirthday();

                    const queries = users.map((user) =>
                        notificationService.insertToFollowers(user._id, {
                            document: user._id,
                            type: notificationType.BIRTHDAY,
                        }),
                    );

                    Promise.all(queries).then(() =>
                        console.log('~~~ Notify birthday ok'),
                    );
                } catch (error) {
                    console.error('Error during daily task:', error);
                }
            },
            {
                scheduled: true,
                timezone: 'Asia/Ho_Chi_Minh', // Chọn múi giờ phù hợp
            },
        );

        dailyTask.start();
    },

    deleteToken: () => {
        const dailyTask = cron.schedule(
            '0 3 * * *',
            () => {
                try {
                    tokenModel
                        .deleteMany({
                            $expr: {
                                $gt: [
                                    { $subtract: [new Date(), '$createdAt'] },
                                    24 * 60 * 60 * 1000,
                                ],
                            },
                        })
                        .then(() => console.log('~~~ DELETE TOKEN OK'));
                } catch (error) {
                    console.error(
                        'Error during delete token daily task:',
                        error,
                    );
                }
            },
            {
                scheduled: true,
                timezone: 'Asia/Ho_Chi_Minh', // Chọn múi giờ phù hợp
            },
        );

        dailyTask.start();
    },

    analyzeTweets: () => {
        const dailyTask = cron.schedule(
            '30 3 * * *',
            async () => {
                try {
                    await trendingService.analyzeTweets();
                    console.log('Analyze tweets completed successfully.');
                } catch (error) {
                    console.error('Error during analyze tweets:', error);
                }
            },
            {
                scheduled: true,
                timezone: 'Asia/Ho_Chi_Minh', // Chọn múi giờ phù hợp
            },
        );

        dailyTask.start();
    },
};
