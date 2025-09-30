import axios from "axios"

const api = axios.create({
    baseURL: "https://laravel-app-production-893f.up.railway.app/api/",
    timeout: 5000
})

export default api;
