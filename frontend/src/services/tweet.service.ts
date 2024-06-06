import api from '../api';
import axiosClient from '../api/axiosClient';

const report = async (tweetId: string) => {
    const res = await axiosClient.post(api.addReporterToTweet(tweetId));

    return res.data;
};

const unReport = async (tweetId: string) => {
    const res = await axiosClient.delete(api.removeReporterFromTweet(tweetId));

    return res.data;
};

const getTweetsByUserId = async ({
    page,
    userId,
}: {
    userId: string;
    page: number;
}) => {
    const res = await axiosClient.get(api.getTweetsByUserId(userId), {
        params: {
            page,
        },
    });

    return res.data;
};

const countTweetsByUserId = async (userId: string) => {
    const res = await axiosClient.get(api.countTweetsByUserId(userId));

    return res.data;
};

export { report, unReport, getTweetsByUserId, countTweetsByUserId };
