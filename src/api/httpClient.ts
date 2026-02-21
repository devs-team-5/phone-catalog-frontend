import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://your-api-url.com',
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
