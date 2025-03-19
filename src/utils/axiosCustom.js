import axios from 'axios';

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BE_URL,
// });

// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//     config.headers.Authorization =  `Bearer ${localStorage.getItem("access_token")}`;
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response && response.data ? response.data : response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
// });

// export default instance;

// Instance cho Node.js Server
const nodeAPI = axios.create({
    baseURL: process.env.REACT_APP_NODE_API_URL, // URL của server Node.js
});

// Instance cho Laravel Server
const laravelAPI = axios.create({
    baseURL: process.env.REACT_APP_LARAVEL_API_URL, // URL của server Laravel
});

// const getToken = () => {
//     return localStorage.getItem("token");
// };
// Thêm interceptor cho cả hai instance
const addInterceptors = (instance) => {
    
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem("token");
        // console.log('Token in interceptor:', localStorage.getItem("token"));
        // config.headers.Authorization = `Bearer ${token}`;
        // const token = getToken();
        // console.log("Token trong interceptor:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error('Token không có trong localStorage');
        }
        return config;
    }, error => Promise.reject(error));

    instance.interceptors.response.use(response => {
        return response && response.data ? response.data : response;
    }, error => {
        return error?.response?.data || Promise.reject(error);
    });
};

// Áp dụng interceptor cho cả hai instance
addInterceptors(nodeAPI);
addInterceptors(laravelAPI);

export { nodeAPI, laravelAPI };