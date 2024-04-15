import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "./index.css";

export default function AuthForm({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const navigate = useNavigate();

  const handleCheckPasswordChange = (event) => {
    setCheckPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

      if(method === "signup") {
        if (password!== checkPassword) {
            setPasswordsDoNotMatch(true);
            return;
        } 
      }

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
                window.location.reload();
            } else {
                navigate("/login")
            }
        } catch (error) {
            setWrongPassword(true);
        } finally {
        }
    };

    var header = method === "login"? "Login" : "Sign Up"

  return (

    <div className="loginDiv">
      <h2>{header}</h2>

      {wrongPassword && (
        <div className="wrongPassword">
          <p className="wrongPasswordText">
            The username or password you entered is incorrect. Please try
            again.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
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

        ### Write a method for the check password field ###
        {method !== "login" && (
          <div id="confPassword">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="checkPassword"
              value={checkPassword}
              onChange={handleCheckPasswordChange}
              required
            />
          </div>
        )}
        <button type="submit">{header}</button>
        {method === "login" && (
          <a href="/signup">Don't Have an Account? Sign Up</a>
        )}
      </form>
    </div>
  );

}

