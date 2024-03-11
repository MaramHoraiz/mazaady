import axios, { AxiosRequestHeaders } from 'axios';


const API_BASE_URL = 'https://staging.mazaady.com/api/v1';
const PRIVATE_KEY = '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
    'private-key': string;
}


axiosInstance.interceptors.request.use((request) => {
    request.headers = {
        'private-key': PRIVATE_KEY,
    } as CustomAxiosRequestHeaders;
    return request;
});

export const fetchMainCategories = () => {
    return axiosInstance.get<any>('/get_all_cats');
};

export const fetchSubCategories = (categoryId: number) => {
    return axiosInstance.get<any>(`/properties?cat=${categoryId}`);
};

export const fetchProperties = (subCategoryId: number) => {
    return axiosInstance.get<any>(`/get-options-child/${subCategoryId}`);
};
