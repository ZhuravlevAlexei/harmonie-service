import axios from 'axios';

const httpClient = axios.create({
  // baseURL: 'https://api.example.com', // Базовый URL
  baseURL: 'https://my.prom.ua/api/v1/',
  //   timeout: 5000, // Таймаут 5 секунд
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export default httpClient;
