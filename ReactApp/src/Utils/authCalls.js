import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URL,
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

export const signout = () => {
    return axiosInstance.post('/logout').then(user => {
        return user.data
    })
}


export const init = () => {
    return axiosInstance.post('/init').then(user => {
        return user.data
    })
}

export const login = (email, password) => {
    return axiosInstance.post('/login', {
        email,
        password
    }).then(user => {
        return user.data
    })
}

export const signup = (firstName, lastName, email, password) => {
    return axiosInstance.post('/signup', {
        firstName,
        lastName,
        email,
        password
    }).then(user => {
        return user.data
    });
}