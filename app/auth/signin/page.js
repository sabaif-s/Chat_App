"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      username: e.target.username.value,
      password: e.target.password.value,
    });

    if (res.error) {
      setError(res.error); // Set error message
    } else {
      window.location.href = "/register"; // Redirect on success
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
