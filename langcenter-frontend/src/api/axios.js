import axios from "axios";
const axiosCleint= axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "X-Requested-With": "XMLHttpRequest",
    },
        withCredentials: true
});
axiosCleint.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`;
    return config;
});
axiosCleint.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
});
export default axiosCleint;