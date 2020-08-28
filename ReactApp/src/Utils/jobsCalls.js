import axios from 'axios'

const baseURL = 'http://localhost:3003/api/v1/jobs';
const axiosInstance = axios.create({
    baseURL: baseURL,
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

export const getJobsStates = (id) => {
    return axiosInstance.get('/states/'+id).then(user => {
        return user.data
    })
}

export const getHrJobs = (id, wsID) => {
    return axiosInstance.get('/hr/'+id+'/'+wsID).then(user => {
        return user.data
    })
}

export const getJob = (id) => {
    return axiosInstance.get('/job/'+id).then(user => {
        return user.data
    })
}

export const deleteJob = (id) => {
    return axiosInstance.delete('/job/'+id).then(user => {
        return user.data
    })
}

export const getWSJobs = (id) => {
    return axiosInstance.get('/ws/'+id).then(user => {
        return user.data
    })
}

export const addNewJob = (jobObj) => {
    return axiosInstance.post('/',jobObj).then(user => {
        return user.data
    })
}

export const updateJob = (jobObj) => {
    return axiosInstance.post('/job',jobObj).then(user => {
        return user.data
    })
}

export const cvsUpload = (id, data) => {
    axios.post(process.env.REACT_APP_NLP_MODEL+"/upload/"+id, data, {})
        .then(result => true)
        .catch(err => false);
}