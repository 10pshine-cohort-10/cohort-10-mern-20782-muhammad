import axios from 'axios';

const TOKEN_KEY = 'notes_app_token';
let memoryToken = null;

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? memoryToken;
  } catch {
    return memoryToken;
  }
}

export function setToken(token) {
  memoryToken = token;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    memoryToken = token;
  }
}

export function clearToken() {
  memoryToken = null;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    memoryToken = null;
  }
}

const client = axios.create({
  baseURL: '/api',
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
