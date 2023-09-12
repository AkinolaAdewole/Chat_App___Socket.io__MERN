// Import the Axios library for making HTTP requests
import axios from 'axios';

// Create an Axios instance with a base URL for the server
const API = axios.create({ baseURL: 'http://localhost:5000' });

// Function to log in a user
export const logIn = (formData) => API.post('/auth/login', formData);

// Function to sign up a new user
export const signUp = (formData) => API.post('/auth/register', formData);
