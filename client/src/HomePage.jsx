import React from "react";
import Navbar from "./NavBar";
import PostTweet from "./PostTweet";
import TweetList from "./TweetList";

function HomePage() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
        <PostTweet />
        <TweetList />
      </div>
    </>
  );
}

export default HomePage;
