"use client"; // Required for client components

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct hook for App Router

function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Replace useNavigate with useRouter

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/pages/Dashboard");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleSignup} className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-center mt-2 text-sm">
              Already a user?{" "}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => router.push("/pages/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
