import React from "react";

// Use a default image if the user has not set one
const defaultProfileImage = "https://via.placeholder.com/100";

function ProfileHeader({ user, onEditProfile }) {
  // A few checks just in case the user object is null or undefined
  const {
    name = "Unknown Name",
    username = "unknownUser",
    bio = "",
    followers = 0,
    posts = 0,
    likes = 0,
    profileImage, // If your backend eventually supports storing the profile image
  } = user || {};

  return (
    <div
      style={{
        // Main container
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top row with avatar and basic info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        {/* Profile image */}
        <img
          src={profileImage || defaultProfileImage}
          alt="Profile"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "1rem",
          }}
        />

        {/* Name and username */}
        <div style={{ flexGrow: 1 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.25rem" }}>{name}</h2>
          <p style={{ margin: 0, color: "#555" }}>@{username}</p>
        </div>

        {/* Edit profile button */}
        <button
          onClick={onEditProfile}
          style={{
            backgroundColor: "#E5E5E5",
            border: "none",
            borderRadius: "20px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          Modifica profilo
        </button>
      </div>

      {/* Stats row (followers, posts, likes) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "1rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <strong>{followers}</strong>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>Followers</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <strong>{posts}</strong>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>Posts</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <strong>{likes}</strong>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>Likes</div>
        </div>
      </div>

      {/* Bio section */}
      <div
        style={{
          fontSize: "1rem",
          color: "#333",
          textAlign: "center",
          borderTop: "1px solid #eee",
          paddingTop: "1rem",
        }}
      >
        {bio.trim() ? bio : "No bio available."}
      </div>
    </div>
  );
}

export default ProfileHeader;
