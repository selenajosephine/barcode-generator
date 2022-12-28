import axios from 'axios';
axios.defaults.baseURL = "https://barcode-generator-production.up.railway.app/api"

export const loginUser = (credentials) => {
    return axios.post('/auth/signin', credentials)
        .then(data => ({status: 'OK', data}))
        .catch(err=>({ error: `${err?.message}. Please retry `}));
}

