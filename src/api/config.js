import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://elraziportal.alis.com.ng/api",
});

export default axiosInstance;
