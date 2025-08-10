import React, { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom';
const HomePage = () => {
    //state to store list of questions, 
    const [questions, setQuestions] = useState([]);
    //state to handle loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //useEffect hook to fetch data when the component mounts
    useEffect(()=>{
            const fetchQuestions = async () => {
                try{
                    //make the api call using our api service instance
                    const response = await api.get('/questions');
                    //update the state with the data from the response
                    setQuestions(response.data);
                }catch(err){
                    //if an error occurs update error state
                    setError('Failed to fetch questions. please try again later');
                    console.error(err);
                }finally{
                    setLoading(false);
                }
            }
            fetchQuestions();
    },[]);

    if(loading) {
        return <div>Loading questions...</div>
    }

    if(error){
        return <div>Error: {error}</div>
    }

  return (
    <div>
      <h2>All Questions</h2>
      <div className="question-list">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className="question-card">
              {/* Wrap the title in a Link component */}
              <h3 style={{ margin: '0 0 5px 0' }}>
                <Link to={`/questions/${question.id}`}>{question.title}</Link>
              </h3>
              <p style={{ margin: '0' }}>Asked by: {question.authorUsername}</p>
            </div>
          ))
        ) : (
          <p>No questions have been asked yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;