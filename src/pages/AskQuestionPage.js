import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AskQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setError('');

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

      alert('Question posted successfully!');
      // Redirect to the homepage to see the new question
      navigate('/');

    } catch (err) {
      console.error('Failed to post question:', err);
      setError('Failed to post question. You may need to log in again.');
    }
  };

  return (
    <div>
      <h2>Ask a Public Question</h2>
      <form onSubmit={handleAskQuestion}>
        <div style={{ margin: '10px 0' }}>
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
        <div style={{ margin: '10px 0' }}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Post Your Question</button>
      </form>
    </div>
  );
};

export default AskQuestionPage;