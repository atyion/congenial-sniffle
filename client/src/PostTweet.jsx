import React, { useState } from "react";

function PostTweet() {
  const [tweetText, setTweetText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/tweets/postTweet", {
        method: "POST",
        credentials: "include", // ensures the HTTP-only cookie is sent (if needed)
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
      } else {
        setError(data.message || "Error posting tweet");
      }
    } catch (err) {
      setError("Error posting tweet: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <textarea
        value={tweetText}
        onChange={handleTweetChange}
        placeholder="What's happening?"
        style={{ width: "100%", minHeight: "80px", padding: "0.5rem" }}
        required
      />
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Tweet
      </button>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default PostTweet;
