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

export { report, unReport };
