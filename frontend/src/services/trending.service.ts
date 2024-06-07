import api from '../api';
import axiosClient from '../api/axiosClient';
import { TrendingType } from '../types';

export const getTrending = async ({
    type,
    page,
}: {
    type: TrendingType;
    page: number;
}) => {
    const res = await axiosClient.get(api.getTrending(type), {
        params: { page },
    });

    return res.data;
};

export const countTrendingPages = async ({ type }: { type: TrendingType }) => {
    const res = await axiosClient.get(api.countTrendingPages(type));

    return res.data;
};

export const getDetailTrending = async ({
    id,
    type,
    page,
}: {
    type: TrendingType;
    id: string;
    page: number;
}) => {
    const res = await axiosClient.get(api.getDetailTrending(type, id), {
        params: { page },
    });

    return res.data;
};
