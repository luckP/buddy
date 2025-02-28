import axios from 'axios';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export const api = axios.create({
  baseURL: 'https://your-api.com/api', // Change to your backend URL
});

// Attach Firebase token to every request
api.interceptors.request.use(async (config) => {
  const user = FIREBASE_AUTH.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
