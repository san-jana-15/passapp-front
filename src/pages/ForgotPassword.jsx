import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Simple email format validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Step 1: Check if field is empty
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Step 2: Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Step 3: Call API if validation passes
    try {
      const res = await axios.post("/api/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent to your email.");
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again later."
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Forgot Password</h2>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
