import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://elraziportal.alis.com.ng/api', // Base URL for your API
//   timeout: 2000,
});

// // axiosInstance.interceptors.request.use(function (config) {
// //     const token = localStorage.getItem(AppConstants.STORAGE_KEYS.TOKEN);
// //     config.headers.Authorization = token ? `Token ${token}` : '';
// //     return config;
// // });

export default axiosInstance;

// export const mainImageUrl = "https://apis.hiltongarden.org";