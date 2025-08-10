import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
const LoginPage = () => {
  // State for the form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State for handling errors from the API
  const [error, setError] = useState('');
  // Hook to programmatically navigate the user
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the context
  const handleLogin = async (e) => {
    // Prevent the default form submission which reloads the page
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Make the POST request to the login endpoint
      const response = await api.post('/auth/login', {
        username: username,
        password: password,
      });

      // Assuming the API returns a token in response.data.accessToken
      if (response.data && response.data.accessToken) {
        // **IMPORTANT**: Store the token in localStorage
        //localStorage.setItem('token', response.data.accessToken);
        login(response.data.accessToken);
        // For now, just log it to confirm and navigate to the homepage
        console.log('Login successful, token saved.');
        alert('Login successful!');
        
        // Redirect user to the homepage after successful login
        navigate('/');
      }
    } catch (err) {
      // If the server responds with an error (e.g., 401 Unauthorized)
      console.error('Login failed:', err);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Display error message if it exists */}
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="button-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;