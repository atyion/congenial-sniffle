import { useEffect, useState } from "react";

function LikeButton({ tweetId, isAuthenticated }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      })
      .catch((err) => {
        console.error("Error checking like status:", err);
      });
  }, [tweetId, isAuthenticated]);

  // Toggle the like (or unlike) state
  const toggleLike = async () => {
    if (!isAuthenticated) {
      setError("You must log in to like tweets.");
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
      } catch (err) {
        setError(err.message);
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
          } else {
            throw new Error(data.message || "Failed to unlike the tweet");
          }
        } else {
          setLiked(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button onClick={toggleLike} disabled={loading}>
        {liked ? "Unlike" : "Like"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LikeButton;
