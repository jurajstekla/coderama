import axios from 'axios';
let store;

export const api = axios.create({
  baseURL: 'https://omdbapi.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    apiKey: '7c08efb8'
  }
});

export const injectStore = _store => {
  store = _store;
};
