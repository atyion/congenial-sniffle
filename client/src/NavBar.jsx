import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfileImage from "./defaultProfileImage.jpg";

function Navbar() {
  // Local state for authentication and user details.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check the session on mount using the refresh endpoint.
  useEffect(() => {
    fetch("http://localhost:8080/users/refresh", {
      method: "GET",
      credentials: "include", // Ensure the cookie is sent.
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Refresh response:", res);
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        // Assuming the refresh endpoint returns an object with a user field.
        if (data && data.user && data.user.id) {
          setIsAuthenticated(true);
          const userId = data.user.id;
          // Now fetch the full user info.
          fetch(`http://localhost:8080/users/info/${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log("User info response:", res);
              if (!res.ok) {
                throw new Error("Failed to fetch user info");
              }
              return res.json();
            })
            .then((userData) => {
              // userData is expected to contain fields like name, _id, username, etc.
              setUser(userData);
            })
            .catch((err) => {
              console.error("Error fetching user info:", err);
              setIsAuthenticated(false);
              setUser(null);
            });
        } else {
          throw new Error("User data missing in refresh response");
        }
      })
      .catch((err) => {
        console.error("Error during refresh:", err);
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Left side: Home link and Search bar */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            marginRight: "1rem",
          }}
        >
          Home
        </Link>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Right side: User info if authenticated, else Login link */}
      <div>
        {isAuthenticated && user ? (
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={user.profilePicture || defaultProfileImage}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ marginLeft: "0.5rem" }}>{user.name}</span>
          </Link>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
