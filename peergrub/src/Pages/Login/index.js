import React, { useState } from "react";
import "./index.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add your login logic
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
    // Reset the form fields after submission
    setUsername("");
    setPassword("");
  };

  if (loggedIn) {
    return <div className="homeDiv">You are logged in!</div>;
  }

  return (
    <div className="loginDiv">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <a href='/signup'>Don't Have an Account? Sign Up</a>
      </form>
    </div>
  );
}
