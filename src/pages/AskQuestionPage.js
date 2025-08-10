import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AskQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(''); // <-- 1. Add state for success message
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- 2. Add state for submission status

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true); // <-- 3. Set submitting to true

    if (!title || !body) {
      setError('Title and body are required.');
      return;
    }

    try {
      // The JWT token is automatically added by our axios interceptor!
      await api.post('/questions', {
        title: title,
        body: body,
      });

      setSuccess('Question posted successfully!');
      // Use a timeout to give the user time to read the message before redirecting
        setTimeout(() => {
           // Redirect to the homepage to see the new question
      navigate('/');
        }, 1500); // 1.5 second delay
     

    } catch (err) {
      console.error('Failed to post question:', err);
      setError('Failed to post question. You may need to log in again.');
        setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ask a Public Question</h2>
      <form onSubmit={handleAskQuestion}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How do I implement a protected route in React?"
            style={{ width: '80%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <br />
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="10"
            style={{ width: '80%' }}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Posting Question...' : 'Post Your Question'}
            </button>
      </form>
    </div>
  );
};

export default AskQuestionPage;