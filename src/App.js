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
        <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="so-logo">Stack Underflow</Link>
        <Link to="/">Questions</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/ask">Ask Question</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="button-primary" style={{color: 'white'}}>Sign up</Link>
          </>
        )}
      </div>
    </header>
    );
}


function App() {
  
  return (
     <Router>
      <div className="app-container">
        <Navigation />

          <div className="main-content">
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
        </div>
      </div>
    </Router>
  );
}

export default App;