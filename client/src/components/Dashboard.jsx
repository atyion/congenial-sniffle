import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";

const Dashboard = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/tweets");
      const tweetsData = Array.isArray(response.data)
        ? response.data
        : response.data.tweets;
      setTweets(Array.isArray(tweetsData) ? tweetsData : []);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setError("Failed to fetch tweets. Please try again later.");
      setTweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTweetChange = (e) => {
    setNewTweet(e.target.value);
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    try {
      await axios.post("/tweets/postTweet", { content: newTweet });
      setNewTweet("");
      fetchTweets();
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="mb-6">
        <form onSubmit={handleTweetSubmit} className="flex">
          <input
            type="text"
            value={newTweet}
            onChange={handleNewTweetChange}
            placeholder="What's happening?"
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tweet
          </button>
        </form>
      </div>
      {loading && <p className="text-center">Loading tweets...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
          ) : (
            <p className="text-center">No tweets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
