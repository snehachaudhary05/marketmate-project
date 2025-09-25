import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [isSignup, setIsSignup] = useState(true); // toggle between signup/login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setMessage("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const url = isSignup
  ? `${BACKEND_URL}/signup`
  : `${BACKEND_URL}/login`;


    try {
      const res = await axios.post(
        url,
        isSignup ? { name, email, password } : { email, password }
      );

      setMessage(res.data);
      setName("");
      setEmail("");
      setPassword("");

      if (isSignup && res.data.toLowerCase().includes("successful")) {
        // Signup successful, switch to login
        setMessage("Signup successful! Please login to access the dashboard.");
        setIsSignup(false);
      }

      if (!isSignup && res.data.toLowerCase().includes("successful")) {
        // Login successful, redirect to dashboard
         window.location.href = process.env.REACT_APP_DASHBOARD_URL; // live frontend
// ✅ dashboard
      }
    } catch (err) {
      setMessage(err.response?.data || "Error occurred");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <p className="mt-3">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button className="btn btn-link p-0" onClick={toggleForm}>
          {isSignup ? "Login" : "Signup"} here
        </button>
      </p>
    </div>
  );
}

export default Signup;
