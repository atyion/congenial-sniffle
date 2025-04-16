"use client";

import { useEffect, useState } from "react";

function LikeButton({ tweetId, isAuthenticated }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0); // Added like count

  // Check if the tweet is already liked when the component mounts
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch(`http://localhost:8080/tweets/isTweetLiked/${tweetId}`, {
      method: "GET",
      credentials: "include", // Include cookies for auth
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(data.isLiked);
        // If your API returns like count, you can set it here
        if (data.likeCount !== undefined) {
          setLikeCount(data.likeCount);
        }
      })
      .catch((err) => {
        console.error("Error checking like status:", err);
      });
  }, [tweetId, isAuthenticated]);

  // Toggle the like (or unlike) state
  const toggleLike = async () => {
    if (!isAuthenticated) {
      setError("You must log in to like tweets.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }

    setLoading(true);
    setError("");

    if (!liked) {
      // Like the tweet via PUT
      try {
        const response = await fetch(
          `http://localhost:8080/tweets/likeTweet/${tweetId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to like the tweet");
        }
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      } finally {
        setLoading(false);
      }
    } else {
      // Unlike the tweet via DELETE
      try {
        const response = await fetch(
          `http://localhost:8080/tweets/unlikeTweet/${tweetId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          // Here, if the error is "Like not found", assume the like is already removed.
          if (data.error === "Like not found") {
            setLiked(false);
            setLikeCount((prev) => Math.max(0, prev - 1));
          } else {
            throw new Error(data.message || "Failed to unlike the tweet");
          }
        } else {
          setLiked(false);
          setLikeCount((prev) => Math.max(0, prev - 1));
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="like-button-container">
      <button
        className={`like-button ${liked ? "liked" : ""} ${
          loading ? "loading" : ""
        }`}
        onClick={toggleLike}
        disabled={loading}
        aria-label={liked ? "Unlike" : "Like"}
      >
        <span className="heart-icon"></span>
        <span className="like-count">{likeCount}</span>
      </button>

      {error && <div className="error-tooltip">{error}</div>}

      <style jsx>{`
        .like-button-container {
          position: relative;
          display: inline-block;
        }

        .like-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          color: #536471;
          font-size: 14px;
        }

        .like-button:hover {
          background-color: rgba(249, 24, 128, 0.1);
          color: #f91880;
        }

        .like-button.liked {
          color: #f91880;
        }

        .like-button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .heart-icon {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }

        .heart-icon:before,
        .heart-icon:after {
          position: absolute;
          content: "";
          left: 9px;
          top: 0;
          width: 9px;
          height: 15px;
          background: currentColor;
          border-radius: 9px 9px 0 0;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
        }

        .heart-icon:after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }

        .liked .heart-icon:before,
        .liked .heart-icon:after {
          background: #f91880;
        }

        .like-button.liked .heart-icon {
          animation: heart-burst 0.45s cubic-bezier(0.17, 0.89, 0.32, 1.49);
        }

        @keyframes heart-burst {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        .like-count {
          font-weight: 500;
        }

        .error-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #f44336;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          margin-bottom: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
          animation: fadeIn 0.3s ease;
        }

        .error-tooltip:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #f44336 transparent transparent transparent;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default LikeButton;
