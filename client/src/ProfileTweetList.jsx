"use client";

import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";

function ProfileTweetList() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);

  // For demo purposes, we assume the user is authenticated.
  const isAuthenticated = true;

  useEffect(() => {
    setLoading(true);
    setError("");
    // Fetch profile tweets instead of all tweets
    fetch("http://localhost:8080/tweets/getUserTweets/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // Uncomment if your backend requires cookies:
      // credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to fetch tweets");
          });
        }
        return res.json();
      })
      .then((data) => {
        // Only assign likes if at least one tweet exists
        if (data.tweets.length > 0) {
          data.tweets[0].likes = likes;
        }
        setTweets(data.tweets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [likes]);

  // Function to format the date in a more readable way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Function to get initials from a username
  const getInitials = (username) =>
    username ? username.substring(0, 2).toUpperCase() : "??";

  return (
    <div className="tweet-list-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tweets...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>⚠️ Error: {error}</p>
        </div>
      ) : tweets.length === 0 ? (
        <div className="no-tweets-message">
          <p>No tweets found. Be the first to post!</p>
        </div>
      ) : (
        tweets.map((tweet) => (
          <div key={tweet._id} className="tweet-card">
            <div className="tweet-header">
              <div className="avatar">{getInitials(tweet.user.username)}</div>
              <div className="user-info">
                <h4 className="username">{tweet.user.username}</h4>
                <span className="timestamp">{formatDate(tweet.createdAt)}</span>
              </div>
            </div>
            <div className="tweet-content">
              <p>{tweet.text}</p>
            </div>
            <div className="tweet-actions">
              <LikeButton
                tweetId={tweet._id}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .tweet-list-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          width: 100%;
        }

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #1d9bf0;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .error-message {
          background-color: #fef2f2;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #fee2e2;
          width: 100%;
          text-align: center;
          margin: 1rem 0;
        }

        .no-tweets-message {
          background-color: #f8fafc;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          text-align: center;
          color: #64748b;
        }

        .tweet-card {
          background-color: white;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          width: 100%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          transition: box-shadow 0.2s ease;
        }

        .tweet-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tweet-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #1d9bf0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          margin-right: 0.75rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .username {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }

        .timestamp {
          font-size: 14px;
          color: #64748b;
        }

        .tweet-content {
          margin-bottom: 1rem;
        }

        .tweet-content p {
          margin: 0;
          font-size: 16px;
          line-height: 1.5;
          color: #1e293b;
          word-wrap: break-word;
        }

        .tweet-actions {
          display: flex;
          justify-content: flex-start;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.75rem;
        }
      `}</style>
    </div>
  );
}

export default ProfileTweetList;
