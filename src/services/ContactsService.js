import axios from 'axios';
import configs from './configs.json'
axios.defaults.baseURL = configs.apiUrl;

export const createContact = (contactInformation) => {
    return axios.post('/contact', contactInformation)
        .then(data => ({status: 'OK', data}))
        .catch(err=>({ error: `${err?.message}. Please retry `}));
}

