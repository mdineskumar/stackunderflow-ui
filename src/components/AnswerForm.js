import React, { useState } from 'react';
import api from '../services/api';

const AnswerForm = ({ questionId, onAnswerPosted }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!body) {
        setError('Answer body cannot be empty.');
        return;
    }

    try {
      // The JWT is added automatically by the interceptor
      await api.post(`/questions/${questionId}/answers`, { body });
      setBody(''); // Clear the textarea
      alert('Your answer has been posted!');
      onAnswerPosted(); // Notify the parent component to refetch data
    } catch (err) {
      console.error('Failed to post answer:', err);
      setError('Failed to post answer. Please try again.');
    }
  };

  return (
    <div className="form-group">

  
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h4>Your Answer</h4>
      <textarea
        rows="7"
        style={{ width: '80%' }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <button type="submit" className="button-primary">Post Your Answer</button>
    </form>
      </div>
  );
};

export default AnswerForm;