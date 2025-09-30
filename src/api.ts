import axios from "axios"

const api = axios.create({
    baseURL: "https://meu-fluxo-back-1.onrender.com/api/",
    timeout: 5000
})

export default api;
