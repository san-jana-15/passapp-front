import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetDone, setResetDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`https://passapp-back.onrender.com/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successful!");
        setResetDone(true);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-96 text-white text-center border border-white/20">
        <h2 className="text-3xl font-bold mb-4">Reset Password</h2>

        {!resetDone ? (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-left text-gray-200">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter new password"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 rounded font-semibold hover:opacity-90 transition-all duration-200"
            >
              Update Password
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition-all duration-200"
            >
              Go to Login
            </Link>
          </div>
        )}

        {message && !resetDone && (
          <p className="mt-4 text-sm text-gray-200">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
