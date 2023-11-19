import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "https://reqres.in/api"
})
export const setToken = (token) =>{
    const auth = `Bearer ${token}`;
    axiosInstance.defaults.headers.common['Authorization'] = auth
}

export default axiosInstance;