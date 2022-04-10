import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api'

export const loginUser = (credentials) => {
    return axios.post('/auth/signin', credentials)
        .then(data => ({status: 'OK', data}))
        .catch(err=>({ error: `${err?.message}. Please retry `}));
}

