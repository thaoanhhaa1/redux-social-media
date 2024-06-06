import api from '../api';
import axiosClient from '../api/axiosClient';

export const getUsers = async ({ page }: { page: number }) => {
    const res = await axiosClient.get(api.getUserList(), {
        params: { page },
    });

    return res.data;
};

export const getUser = async ({ username }: { username: string }) => {
    const res = await axiosClient.get(api.getUserProfile(username));

    return res.data;
};

export const countPages = async () => {
    const res = await axiosClient.get(api.countListPages());

    return res.data;
};

export const togglePin = async ({
    userId,
    isPin,
}: {
    userId: string;
    isPin: boolean;
}) => {
    const res = await axiosClient.patch(api.togglePin(userId), {
        isPin,
    });

    return res.data;
};
