import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import api from '../services/api';
// We'll reuse the AnswerResponse structure implicitly, or create a dedicated AnswerDisplay component later.

const QuestionDetailPage = () => {
  // Get the question ID from the URL parameters (e.g., /questions/123)
  const { id } = useParams();
  
  // State for the question data, loading, and error
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the question details when the component mounts or the ID changes
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      setLoading(true); // Start loading
      setError(null);   // Clear previous errors

      try {
        // Fetch the specific question using its ID
        const response = await api.get(`/questions/${id}`);
        setQuestion(response.data);
      } catch (err) {
        console.error('Failed to fetch question details:', err);
        // Set a user-friendly error message
        setError('Could not load question. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchQuestionDetails();
  }, [id]); // Re-run the effect if the ID in the URL changes

  // Render loading or error states
  if (loading) {
    return <div>Loading question details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the question and its answers
  return (
    <div>
      <h1>{question.title}</h1>
      <p>Asked by: {question.authorUsername} on {new Date(question.createdAt).toLocaleString()}</p>
      <p>{question.body}</p>

      <hr />

      <h3>Answers ({question.answers.length})</h3>
      {question.answers.length > 0 ? (
        question.answers.map((answer) => (
          <div key={answer.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
            <p>{answer.body}</p>
            <p>Answered by: {answer.authorUsername} on {new Date(answer.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No answers yet.</p>
      )}
    </div>
  );
};

export default QuestionDetailPage;