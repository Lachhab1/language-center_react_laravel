import axios from "axios";
const axiosCleint= axios.create({
    baseURL: "https://english-castle.azurewebsites.net:8080",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
axiosCleint.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
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
