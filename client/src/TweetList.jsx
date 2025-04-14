import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";

function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  var [likes, setLikes] = useState();

  // For demo purposes, we assume the user is authenticated.
  // In a real app, replace this with a value from your auth context.
  const isAuthenticated = true;

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:8080/tweets/getTweets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // If your backend requires cookie authentication, uncomment next line:
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
        data.tweets[0].likes = likes;

        setTweets(data.tweets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tweets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          style={{
            border: "1px solid gray",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h4>{tweet.user.username}</h4>
          <p>{tweet.text}</p>
          <small>Posted on: {new Date(tweet.createdAt).toLocaleString()}</small>
          {/* Like Button integrated into each tweet */}
          <div style={{ marginTop: "1rem" }}>
            <LikeButton tweetId={tweet._id} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TweetList;
