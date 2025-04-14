import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import PostTweet from "./PostTweet";
import TweetList from "./TweetList";
import Navbar from "./NavBar"; // Assuming you have a NavBar component

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Refresh session to get user ID
        const refreshRes = await fetch("http://localhost:8080/users/refresh", {
          method: "GET",
          credentials: "include",
        });
        if (!refreshRes.ok) {
          throw new Error("Failed to refresh session");
        }
        const refreshData = await refreshRes.json();
        const userId = refreshData.user.id; // e.g. "67fbd9db48973a0d882c3b04"

        // 2. Fetch the user info by userId
        const infoRes = await fetch(
          `http://localhost:8080/users/info/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!infoRes.ok) {
          throw new Error("Failed to fetch user info");
        }
        const userInfo = await infoRes.json();
        setUser(userInfo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Here you might open an edit form or navigate to an /edit-profile route
  };

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <>
      <Navbar /> {/* Assuming you have a NavBar component */}
      <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
        {/* ProfileHeader with all details */}
        <ProfileHeader user={user} onEditProfile={handleEditProfile} />

        {/* Optional PostTweet component */}
        <div style={{ marginTop: "2rem" }}>
          <PostTweet />
        </div>

        {/* Display user’s tweets */}
        <div style={{ marginTop: "2rem" }}>
          <TweetList userId={user._id} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
