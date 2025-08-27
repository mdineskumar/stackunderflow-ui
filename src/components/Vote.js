import React, { useState } from "react";
import { voteOnQuestion, voteOnAnswer } from "../services/api";
import "./Vote.css"; // Import our new CSS
import { useAuth } from "../context/AuthContext";

// Simple SVG components for the arrows
const UpArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 4l8 8h-5v8h-6v-8H4z"></path>
  </svg>
);

const DownArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 20l-8-8h5V4h6v8h5z"></path>
  </svg>
);

const Vote = ({ post, postType, onVoteSuccess }) => {
  const { isLoggedIn } = useAuth();

  // 'userVote' can be 'UPVOTE', 'DOWNVOTE', or null
  const [userVote, setUserVote] = useState(null); // NOTE: For a complete solution, you'd need the API to tell you the user's current vote on load. We are simplifying for now.
  const [error, setError] = useState("");

  const handleVote = async (voteType) => {
        if (!isLoggedIn) {
            setError('You must be logged in to vote.');
            return;
        }
        setError('');

        const voteApi = postType === 'question' ? voteOnQuestion : voteOnAnswer;

        try {
            // 1. Make the API call to cast the vote.
            await voteApi(post.id, voteType);
            
            // 2. If successful, update the local button highlight state.
            setUserVote(prevVote => (prevVote === voteType ? null : voteType));

            // 3. Call the callback function passed from the parent to trigger a data re-fetch.
            onVoteSuccess();

        } catch (err) {
            console.error('Failed to vote:', err);
            setError('Vote failed. Please try again.');
        }
    };

  return (
     <div className="vote-container">
            <button
                className={`vote-button ${userVote === 'UPVOTE' ? 'voted' : ''}`}
                onClick={() => handleVote('UPVOTE')}
                title="Upvote"
            >
                <UpArrow />
            </button>

            {/* Display the voteCount directly from the prop */}
            <span className="vote-count">{post.voteCount}</span>

            <button
                className={`vote-button ${userVote === 'DOWNVOTE' ? 'voted' : ''}`}
                onClick={() => handleVote('DOWNVOTE')}
                title="Downvote"
            >
                <DownArrow />
            </button>
            {error && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{error}</p>}
        </div>
  );
};

export default Vote;
