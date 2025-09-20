import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:8000/",
    withCredentials:true
})


api.interceptors.request.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;
        if(error.response.status===403 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const res = await api.post('/refresh')
                const newAccessToken = res.data.accessToken

                localStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers['Authorization'] = `Barer ${newAccessToken}`
                return api(originalRequest)
            }
            catch (err) {
                console.error("Refresh failed. Please login again.");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error)
    }
)

export default api;