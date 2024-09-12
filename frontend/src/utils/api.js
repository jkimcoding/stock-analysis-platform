import axios from 'axios';

export const getData = (uri, headers) => axios(uri, {headers});

export const postData = (uri, data, headers) => axios.post(uri, data, {headers});

export const putData = (uri, data, headers) => axios.put(uri, data, {headers});
