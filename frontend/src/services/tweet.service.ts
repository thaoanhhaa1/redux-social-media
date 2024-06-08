import api from '../api';
import axiosClient from '../api/axiosClient';

export const report = async (tweetId: string) => {
    const res = await axiosClient.post(api.addReporterToTweet(tweetId));

    return res.data;
};

export const unReport = async (tweetId: string) => {
    const res = await axiosClient.delete(api.removeReporterFromTweet(tweetId));

    return res.data;
};

export const getTweetsByUserId = async ({
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

export const countTweetsByUserId = async (userId: string) => {
    const res = await axiosClient.get(api.countTweetsByUserId(userId));

    return res.data;
};

export const addViewer = async (tweetId: string) => {
    const res = await axiosClient.patch(api.addViewer(tweetId));

    return res.data;
};

export const deleteTweet = async (tweetId: string) => {
    const res = await axiosClient.delete(api.deleteTweet(tweetId));

    return res.data;
};
