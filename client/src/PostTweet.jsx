"use client";

import { useState } from "react";

function PostTweet() {
  const [tweetText, setTweetText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_TWEET_LENGTH = 280;
  const remainingChars = MAX_TWEET_LENGTH - tweetText.length;
  const isOverLimit = remainingChars < 0;

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/tweets/postTweet", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: tweetText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Tweet posted successfully");
        setTweetText("");
        // Reload the page (or consider updating state instead)
        window.location.reload();
      } else {
        setError(data.message || "Error posting tweet");
      }
    } catch (err) {
      setError("Error posting tweet: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tweet-form-container">
      <form onSubmit={handleSubmit} className="tweet-form">
        <div className="tweet-form-header">
          <h2>Tweet-clone something</h2>
        </div>

        <div className="tweet-form-content">
          <textarea
            value={tweetText}
            onChange={handleTweetChange}
            placeholder="What's clone-happening?"
            className="tweet-textarea"
            required
          />

          <div className={`char-counter ${isOverLimit ? "over-limit" : ""}`}>
            {remainingChars} {remainingChars === 1 ? "character" : "characters"}{" "}
            remaining
          </div>

          {success && (
            <div className="alert success">
              <p>{success}</p>
            </div>
          )}

          {error && (
            <div className="alert error">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="tweet-form-footer">
          <button
            type="submit"
            className="tweet-button"
            disabled={
              isSubmitting || isOverLimit || tweetText.trim().length === 0
            }
          >
            {isSubmitting ? "Posting..." : "Tweet"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .tweet-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1rem; /* Added horizontal padding */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }
        .tweet-form {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .tweet-form-header {
          padding: 16px 20px;
          border-bottom: 1px solid #eaeaea;
        }
        .tweet-form-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
        }
        .tweet-form-content {
          padding: 16px 45px;
        }
        .tweet-textarea {
          width: 100%;
          min-height: 120px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          resize: none;
          font-size: 16px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .tweet-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .char-counter {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
          font-size: 14px;
          color: #64748b;
        }
        .char-counter.over-limit {
          color: #ef4444;
          font-weight: 500;
        }
        .alert {
          margin-top: 16px;
          padding: 12px 16px;
          border-radius: 6px;
        }
        .alert p {
          margin: 0;
          font-size: 14px;
        }
        .success {
          background-color: #f0fdf4;
          border: 1px solid #dcfce7;
          color: #166534;
        }
        .error {
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          color: #b91c1c;
        }
        .tweet-form-footer {
          display: flex;
          justify-content: flex-end;
          padding: 16px 20px;
          border-top: 1px solid #eaeaea;
        }
        .tweet-button {
          background-color: #1d9bf0;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          padding: 10px 20px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .tweet-button:hover:not(:disabled) {
          background-color: #1a8cd8;
        }
        .tweet-button:disabled {
          background-color: #9ad0f9;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default PostTweet;
