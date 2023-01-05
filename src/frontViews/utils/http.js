import axios from 'axios';
// import qs from 'qs'

const request = axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?'/api':'http://netease-cloud-music-api-two-psi-56.vercel.app',
    timeout: 10000
})

request.interceptors.request.use(config=>{
    config.headers['Content-Type'] = 'text/plain';
    return config;
},err=>{
    return Promise.reject(err);
})

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        }
    },
    error => Promise.reject(error)
)

export default request;