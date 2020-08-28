import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/api/v1',
    withCredentials: true,
});
axiosInstance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error.response)
    }
);


export const requestReading = (id, desc) => {
    return axiosInstance.post(`/readPdf/${id}`, {desc}).then(user => {
            return user.data
    })
}
