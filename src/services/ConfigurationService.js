import axios from 'axios';
import { getToken } from '../utils/UserUtils';
axios.defaults.baseURL = 'http://localhost:8080/api'

export const getConfigurationService = () => {
    return axios.get('/configuration', {
        headers: {
            'Authorization': getToken()
        }
    }).then(resp => ({ status: 'OK', data: resp.data }))
      .catch(err => ({ error: `${err?.message}. Please retry ` }));
}

export const saveConfiguration = (payload) => {
    return axios.post('/configuration', payload, {
        headers: {
            'Authorization': getToken()
        }
    }).then(data => ({ status: 'OK', data }))
      .catch(err => ({ error: `${err?.message}. Please retry ` }));
}