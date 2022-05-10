import axios from 'axios';
axios.defaults.baseURL = 'https://barcodes-generator.herokuapp.com/api'

export const loginUser = (credentials) => {
    return axios.post('/auth/signin', credentials)
        .then(data => ({status: 'OK', data}))
        .catch(err=>({ error: `${err?.message}. Please retry `}));
}

