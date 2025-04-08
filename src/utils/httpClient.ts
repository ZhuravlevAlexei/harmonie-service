import axios from 'axios';
import { env } from './env';

const httpClient = axios.create({
  baseURL: 'https://my.prom.ua/api/v1/',
  //   timeout: 5000, // Таймаут 5 секунд
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env('PROM_API_TOKEN')}`,
  },
});

export default httpClient;
