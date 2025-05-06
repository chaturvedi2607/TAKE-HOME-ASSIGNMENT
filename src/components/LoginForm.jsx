import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("token", "demo-jwt-token");
      onLogin(email);
    } else {
      alert("Email and password are required.");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password:</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="ml-2 text-blue-600 hover:underline font-medium"
        >
          {mode === "login" ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
}
