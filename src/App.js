import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';
import { useAuth } from './context/AuthContext'; // Import the hook
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import RegisterPage from './pages/RegisterPage';

// Create a new component for the navigation logic
const Navigation = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear the auth state
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          {isLoggedIn && <Link to="/ask" style={{ marginRight: '1rem' }}>Ask Question</Link>}
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
          {/* 2. Add Register link */}
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
          )}
        </nav>
    );
}


function App() {
  
  return (
     <Router>
      <div className="App">
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
             <Route path="/register" element={<RegisterPage />} />
            {/* 4. Add the new protected route */}
            <Route 
              path="/ask" 
              element={
                <ProtectedRoute>
                  <AskQuestionPage />
                </ProtectedRoute>
              } 
            />
             <Route path="/questions/:id" element={<QuestionDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;