import axios from 'axios';

/// Get the backend URL from environment variables.
// This makes it easy to switch between local development and a live deployment.
// We'll fall back to localhost:8080 if the variable isn't set.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

console.log(API_URL);
// Create an instance of axios with a custom configuration.
const api = axios.create({
  baseURL: API_URL,
});

/*
  =================================================================================
  IMPORTANT:
  Later, we will add logic here (an "interceptor") to automatically attach
  the JWT authentication token to every outgoing request.
  For now, this is all we need.
  =================================================================================
*/

export default api;