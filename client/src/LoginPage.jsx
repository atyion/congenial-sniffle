"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing valid session on mount
  useEffect(() => {
    fetch("http://localhost:8080/users/refresh", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          // If session is valid, redirect the user
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Session check failed", err);
        // Not logged in? Continue to show the login form.
      });
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <img src="/twitter_clone.png" alt="Logo" className="logo-image" />
          </div>
          <h1>Sign in to Twitter</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Sign up
            </Link>
          </p>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>
        </div>
      </div>

      <style jsx>{`
        .logo-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 0.5rem;
        }
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f7f9fa;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          padding: 32px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }

        .logo {
          margin-bottom: 20px;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #1d9bf0;
          color: white;
          border-radius: 50%;
          font-weight: bold;
          font-size: 24px;
        }

        .login-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #0f1419;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          color: #536471;
          margin-bottom: 8px;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #cfd9de;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input:focus {
          border-color: #1d9bf0;
          box-shadow: 0 0 0 1px #1d9bf0;
          outline: none;
        }

        .form-input::placeholder {
          color: #8899a6;
        }

        .error-message {
          background-color: #fef2f2;
          color: #b91c1c;
          padding: 12px;
          border-radius: 4px;
          font-size: 14px;
          border-left: 3px solid #b91c1c;
        }

        .success-message {
          background-color: #f0fdf4;
          color: #166534;
          padding: 12px;
          border-radius: 4px;
          font-size: 14px;
          border-left: 3px solid #166534;
        }

        .login-button {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1d9bf0;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
          height: 48px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #1a8cd8;
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-button.loading {
          background-color: #1a8cd8;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #536471;
        }

        .register-link,
        .forgot-password-link {
          color: #1d9bf0;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .register-link:hover,
        .forgot-password-link:hover {
          color: #1a8cd8;
          text-decoration: underline;
        }

        .forgot-password-link {
          display: inline-block;
          margin-top: 12px;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .login-container {
            padding: 24px;
            box-shadow: none;
            border: 1px solid #cfd9de;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
