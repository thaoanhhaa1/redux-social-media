import axios, { InternalAxiosRequestConfig } from 'axios';
import { token } from '../utils';

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

    const tokenValue = token.get();

    if (tokenValue) customersHeader.Authorization = tokenValue;

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
