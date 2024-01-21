import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://34.255.190.46/api', // Base URL for your API
//   timeout: 2000,
});

// // axiosInstance.interceptors.request.use(function (config) {
// //     const token = localStorage.getItem(AppConstants.STORAGE_KEYS.TOKEN);
// //     config.headers.Authorization = token ? `Token ${token}` : '';
// //     return config;
// // });

export default axiosInstance;

// export const mainImageUrl = "https://apis.hiltongarden.org";