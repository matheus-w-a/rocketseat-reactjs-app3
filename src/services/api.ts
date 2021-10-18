import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ignews-matheus-w-a.vercel.app/api'
})