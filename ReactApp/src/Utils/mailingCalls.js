import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3006/api/v1/mailing',
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

export const inviteToWS = (wsName, email) => {
    console.log(wsName);
    var body = 'You have been invited to join ' + wsName + ' Workspace on RankUp, Please register from here http://localhost:3000/signup';
    return axiosInstance.post('/', {
        receiver: email,
        title: 'Invitation to ' + wsName + ' Workspace on RankUp',
        message: body,
    }).then(user => {
            return user.data
    })
}
