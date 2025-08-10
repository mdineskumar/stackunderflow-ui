import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnswerForm from '../components/AnswerForm';
// We'll reuse the AnswerResponse structure implicitly, or create a dedicated AnswerDisplay component later.

const QuestionDetailPage = () => {
  // Get the question ID from the URL parameters (e.g., /questions/123)
  const { id } = useParams();
  
  // State for the question data, loading, and error
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth(); // <-- 3. Get login status
  // Fetch the question details when the component mounts or the ID changes
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
  useEffect(() => {
    fetchQuestionDetails();
  }, [id]); // Re-run the effect if the ID in the URL changes

  // Render loading or error states
  if (loading) {
    return <div>Loading question details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
if (!question) return <div>Question not found.</div>;
  // Render the question and its answers
  return (
    <div>
      <h1>{question.title}</h1>
      <p>Asked by: {question.authorUsername} on {new Date(question.createdAt).toLocaleString()}</p>
      <div className="question-detail-body">{question.body}</div>

      <hr />

      <h3>Answers ({question.answers.length})</h3>
      {question.answers.length > 0 ? (
        question.answers.map((answer) => (
          <div key={answer.id} className="answer-card">
            <p className="question-detail-body">{answer.body}</p>
            <p>Answered by: {answer.authorUsername} on {new Date(answer.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No answers yet.</p>
      )}
      {/* 4. Conditionally render the AnswerForm */}
      {isLoggedIn ? (
        <AnswerForm questionId={id} onAnswerPosted={fetchQuestionDetails} />
      ) : (
        <p>Please log in to post an answer.</p>
      )}
    </div>
  );
};

export default QuestionDetailPage;