import React, { useState } from 'react';
import api from '../services/api';

const AnswerForm = ({ questionId, onAnswerPosted }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <-- 1. Add state for success message
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- 2. Add state for submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
     setSuccess('');
    setIsSubmitting(true); // <-- 3. Set submitting to true
    if (!body) {
        setError('Answer body cannot be empty.');
        return;
    }

    try {
      // The JWT is added automatically by the interceptor
      await api.post(`/questions/${questionId}/answers`, { body });
      setBody(''); // Clear the textarea
      setSuccess('Your answer has been posted!');
      // Use a timeout to give the user time to read the message before redirecting
        setTimeout(() => {
          onAnswerPosted(); // Notify the parent component to refetch data
        }, 1500); // 1.5 second delay
      
    } catch (err) {
      console.error('Failed to post answer:', err);
      setError('Failed to post answer. Please try again.');
      setIsSubmitting(false); // <-- 5. Re-enable the form on failure
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
       {success && <p style={{ color: 'green' }}>{success}</p>}
      <br />
      <button type="submit" className="button-primary" disabled={isSubmitting}>
         {isSubmitting ? 'Posting Answer...' : 'Post Your Answer'}
        </button>
    </form>
      </div>
  );
};

export default AnswerForm;