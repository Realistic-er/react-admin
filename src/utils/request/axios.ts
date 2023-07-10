import axios from 'axios';

const request = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default request;