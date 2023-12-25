const notificationService = require('../services/notificationService');

module.exports = {
    getMyNotifications: async (req, res, next) => {
        const _id = req.body._id;
        const page = req.query.page ?? 1;
        const pages = +(req.query.pages ?? 1);

        try {
            const queries = [
                notificationService.getMyNotifications(_id, +page),
            ];

            if (!pages) queries.push(notificationService.countPages(_id));

            const [data, numberOfPages] = await Promise.all(queries);

            res.json({
                data,
                numberOfPages,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteNotificationItem: async (req, res, next) => {
        const notificationId = req.params.notification_id;
        const userId = req.body._id;

        try {
            const update = await notificationService.deleteNotificationItem(
                userId,
                notificationId,
            );

            if (update.matchedCount === 0)
                return res
                    .status(404)
                    .json(errors[404]("Notification wasn't found"));

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
