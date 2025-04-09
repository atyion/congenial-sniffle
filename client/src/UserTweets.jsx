import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "./LikeButton";

function UserTweets() {
  // Extract the user ID from the URL parameter
  const { id } = useParams();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For now, assume the user is authenticated.
  // Replace this with your authentication context/state.
  const isAuthenticated = true;

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:8080/tweets/getUserTweets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // If your backend requires cookie-based auth, uncomment this:
      // credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to fetch user tweets");
          });
        }
        return res.json();
      })
      .then((data) => {
        setTweets(data.tweets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user tweets...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tweets || tweets.length === 0)
    return <p>No tweets found for this user.</p>;

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
          {/* Render the LikeButton for each tweet */}
          <div style={{ marginTop: "1rem" }}>
            <LikeButton tweetId={tweet._id} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTweets;
