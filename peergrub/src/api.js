import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const defaultApiURL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: process.env.VITE_API_URL || defaultApiURL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        // For example, you can redirect to an error page or display a toast message
        return Promise.reject(error);
    }
);

export default api;
