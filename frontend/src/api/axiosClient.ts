import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_END_POINTS,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const customersHeader: {
        Authorization?: string;
    } = {};

    if (document.cookie) {
        customersHeader.Authorization = document.cookie;
    }

    const newConfig = {
        ...config,
        headers: {
            ...customersHeader,
            ...config.headers,
        },
    } as
        | InternalAxiosRequestConfig<any>
        | PromiseLike<InternalAxiosRequestConfig<any>>;

    return new Promise((resolve) => resolve(newConfig));
});

export default axiosClient;
