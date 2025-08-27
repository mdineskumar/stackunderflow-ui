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


// =======================================================
// THIS IS THE NEW, IMPORTANT PART
// =======================================================
// Axios Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
// =======================================================


// ======================================================== //
// ==                  NEW VOTE FUNCTIONS                == //
// ======================================================== //

/**
 * Sends a vote for a specific question.
 * @param {number} questionId The ID of the question to vote on.
 * @param {string} voteType Can be 'UPVOTE' or 'DOWNVOTE'.
 * @returns {Promise} The axios promise for the request.
 */
export const voteOnQuestion = (questionId, voteType) => {
    return api.post(`/questions/${questionId}/vote`, { voteType });
};

/**
 * Sends a vote for a specific answer.
 * @param {number} answerId The ID of the answer to vote on.
 * @param {string} voteType Can be 'UPVOTE' or 'DOWNVOTE'.
 * @returns {Promise} The axios promise for the request.
 */
export const voteOnAnswer = (answerId, voteType) => {
    return api.post(`/answers/${answerId}/vote`, { voteType });
};

export default api;