import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "./LikeButton";
// import your auth context if you have one, e.g.:
// import { AuthContext } from "./AuthContext";

function TweetDetail() {
  const { id } = useParams(); // Get tweet ID from the URL
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // If you're using a global auth context:
  // const { isAuthenticated } = useContext(AuthContext);
  // For now, we can assume the user is authenticated:
  const isAuthenticated = true;

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:8080/tweets/getTweet/${id}`, {
      method: "GET",
      // Uncomment if your endpoint requires cookies for authentication:
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to fetch tweet");
          });
        }
        return res.json();
      })
      .then((data) => {
        setTweet(data.tweet);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading tweet...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!tweet) {
    return <p>No tweet found.</p>;
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1rem",
        margin: "1rem auto",
        maxWidth: "600px",
      }}
    >
      <h3>Tweet by {tweet.user.username}</h3>
      <p>{tweet.text}</p>
      <small>Posted on: {new Date(tweet.createdAt).toLocaleString()}</small>
      {/* Include the LikeButton component and pass in the tweet ID and auth state */}
      <div style={{ marginTop: "1rem" }}>
        <LikeButton tweetId={tweet._id} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}

export default TweetDetail;
