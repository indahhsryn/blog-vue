import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.example.com', // Ganti dengan URL API Anda
  headers: {
    'Content-Type': 'application/json',
  },
});
