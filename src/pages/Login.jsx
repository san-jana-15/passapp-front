import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setMessage(response.ok ? `✅ ${data.message}` : `❌ ${data.message}`);
    } catch (error) {
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <div className="mt-6 text-center text-gray-300 space-y-2">
          <Link to="/forgot-password" className="text-cyan-400 hover:underline block">
            Forgot Password?
          </Link>
          <Link to="/" className="text-pink-400 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
