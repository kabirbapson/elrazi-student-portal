import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://elrazi-api.bynail.com/api",
});

export default axiosInstance;
