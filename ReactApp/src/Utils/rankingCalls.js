import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3004/api/v1/ranking',
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

export const classifyCVs = (id) => {
    console.log(id);
    return axiosInstance.get(`/${id}`).then(user => {
        return user.data
    })
}

export const classesWithNum = (id) => {
    return axiosInstance.get(`/${id}/states/`).then(user => {
        return user.data
    })
}

export const getClassCVs = (id, classType) => {
    return axiosInstance.get(`/${id}/class/${classType}`).then(user => {
        return user.data
    })
}
