import api from '../api';
import axiosClient from '../api/axiosClient';

const blockUser = async (userId: string) => {
    const res = await axiosClient.post(api.block(), {
        userId,
    });

    return res.data;
};

const unblockUser = async (userId: string) => {
    const res = await axiosClient.post(api.unblock(), {
        userId,
    });

    return res.data;
};

const getBlockedUsers = async () => {
    const res = await axiosClient.get(api.getBlockedUsers());

    return res.data;
};

export { blockUser, unblockUser, getBlockedUsers };
