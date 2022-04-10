import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import handleAxiosResponseError from './utils/handleAxiosReponseError';
import handleAxiosResponseSuccess from './utils/handleAxiosReponseSuccess';

const Http = axios.create();

class Service {
    protected static Http = Http;
    protected static getData = getData

    public static setRequestInterceptors(
        onFulFilled: (request: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
        onRejected: (error: any) => any
    ) {
        Http.interceptors.request.use(onFulFilled, onRejected)
    }
}

function getData<T>(res: AxiosResponse<T>) {
    return res.data;
}

Http.defaults.baseURL = 'http://localhost:8080';

Http.interceptors.response.use(
    handleAxiosResponseSuccess, handleAxiosResponseError
);


export default Service;