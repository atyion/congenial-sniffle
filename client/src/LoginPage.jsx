import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check for existing valid session on mount
  useEffect(() => {
    fetch("http://localhost:8080/users/refresh", {
      method: "GET",
      credentials: "include", // important to include cookies
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

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        credentials: "include", // ensure cookie can be set via the response
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        // Redirect to home page after a short delay (or immediately)
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong during login.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1.5px solid black",
          padding: "1rem",
          width: "fit-content",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
          <button type="submit">Register</button>
        </form>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
