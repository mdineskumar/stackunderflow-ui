import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnswerForm from '../components/AnswerForm';
import Vote from '../components/Vote';
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
      {/* --- QUESTION SECTION --- */}
        {/* The title and metadata are now outside the flex container */}
        <h1>{question.title}</h1>
        <p style={{color: '#6a737c', fontSize: '13px'}}>
            Asked by: {question.authorUsername} on {new Date(question.createdAt).toLocaleString()}
        </p>
        <hr />

        {/* This new flex container aligns the vote component with the question body */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Vote post={question} postType="question" onVoteSuccess={fetchQuestionDetails} />
            <div className="question-detail-body" style={{ flex: 1 }}>
                {question.body}
            </div>
        </div>

        {/* --- ANSWERS SECTION --- */}
        <h3 style={{marginTop: '40px'}}>Answers ({question.answers.length})</h3>
        
        {question.answers.length > 0 ? (
            question.answers.map((answer) => (
                // We apply the same pattern to each answer
                <div key={answer.id} style={{ borderTop: '1px solid #d6d9dc', paddingTop: '16px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Vote post={answer} postType="answer" onVoteSuccess={fetchQuestionDetails} />
                        <div className="question-detail-body" style={{ flex: 1 }}>
                            {answer.body}
                        </div>
                    </div>
                    <p style={{textAlign: 'right', color: '#6a737c', fontSize: '13px', marginTop: '10px'}}>
                        Answered by: {answer.authorUsername} on {new Date(answer.createdAt).toLocaleString()}
                    </p>
                </div>
            ))
        ) : (
            <p>No answers yet.</p>
        )}

        {/* --- POST AN ANSWER SECTION (remains the same) --- */}
        {isLoggedIn ? (
            <AnswerForm questionId={id} onAnswerPosted={fetchQuestionDetails} />
        ) : (
            <p style={{ marginTop: '20px' }}>Please log in to post an answer.</p>
        )}

    </div>
  );
};

export default QuestionDetailPage;