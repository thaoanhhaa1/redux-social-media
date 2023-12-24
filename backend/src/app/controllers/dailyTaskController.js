const cron = require('node-cron');

const { notificationType } = require('../../constants');
const notificationModel = require('../models/notificationModel');
const UserModel = require('../models/userModel');
const { userService } = require('../services');

module.exports = {
    birthdayTaskNotify: () => {
        const dailyTask = cron.schedule(
            '0 0 * * *',
            async () => {
                try {
                    const users = await userService.findUserIdTodayBirthday();

                    const queries = users.map((user) =>
                        notificationModel.insertToFollowers(user._id, {
                            document: user._id,
                            type: notificationType.BIRTHDAY,
                        }),
                    );

                    Promise.all(queries).then(() =>
                        console.log('~~~ Notify birthday ok'),
                    );

                    console.log('Daily task completed successfully.');
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
};
