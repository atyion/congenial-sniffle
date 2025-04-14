import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfileImage from "./defaultProfileImage.jpg";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh session to get user info
    fetch("http://localhost:8080/users/refresh", {
      method: "GET",
      credentials: "include", // Ensure cookies are sent
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user && data.user.id) {
          setIsAuthenticated(true);
          const userId = data.user.id;
          // Fetch full user info
          return fetch(`http://localhost:8080/users/info/${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          throw new Error("User data missing in refresh response");
        }
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        console.error("Error during refresh:", err);
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout endpoint using POST
      const res = await fetch("http://localhost:8080/users/logout", {
        method: "POST",
        credentials: "include", // Send credentials so the HTTP-only cookie is accessible to the server
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
      // Successfully logged out on the server
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

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
      {/* Left side: Home link and Search */}
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

      {/* Right side: User info or Login */}
      <div style={{ position: "relative" }}>
        {isAuthenticated && user ? (
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Wrap the image and name in a Link so clicking them goes to /profile */}
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

            {/* Dropdown menu for logout */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              >
                {/* Use stopPropagation to prevent the logout button click from triggering navigation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
