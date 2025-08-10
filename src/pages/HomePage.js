import React, { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
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
            <div key={question.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h3>{question.title}</h3>
              <p>Asked by: {question.authorUsername}</p>
              {/* We will make this a link in a later step */}
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