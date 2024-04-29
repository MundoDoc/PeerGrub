import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "./index.css";

export default function AuthForm({ route, method }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem(ACCESS_TOKEN)) {
      navigate("/");
    }
  }, [navigate]);

  const handleCheckPasswordChange = (event) => {
    setCheckPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (method === "signup") {
        if (password !== checkPassword) {
            setPasswordsDoNotMatch(true);
            return;
        } else if (firstName === "" || lastName === "") {
            alert("Please fill out all fields");
            return;
        }

        try {
            // Attempt to create the user
            const userRes = await api.post(route, { username, password })
            if (userRes.status >= 200 && userRes.status < 300) {  // Check if the API call was successful
              route = "/api/token/";
              const newRes = await api.post(route, { username, password });
              localStorage.setItem(ACCESS_TOKEN, newRes.data.access);
              localStorage.setItem(REFRESH_TOKEN, newRes.data.refresh);
                // User was created successfully, now create profile
                try {
                    var first_name = firstName;
                    var last_name = lastName;
                    const profileRes = await api.post('/api/profile/', { first_name, last_name});
                    if (profileRes.status >= 200 && profileRes.status < 300) {
                        navigate("/");
                    } else {
                        alert("Failed to create profile");
                    }
                } catch (err) {
                    alert("Error creating profile: " + err.message);
                }
            } else {
                alert("Failed to create user");
            }
        } catch (error) {
            setCheckUsername(true); // This might need renaming, as it might not be the correct interpretation of the error.
            console.error('Error during user registration:', error);
        }
    } else if (method === "login") {
        try {
            const res = await api.post(route, { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
            window.location.reload();
        } catch (error) {
            setWrongPassword(true);
        }
    } else {
        navigate("/login");
    }
};

    var header = method === "login"? "Login" : "Sign Up"

  return (

    <div className="loginDiv">
      <h2>{header}</h2>

      {/* If passwords do not match, show error message */}
      {wrongPassword && (
        <div className="wrongPassword">
          <p className="wrongPasswordText">
            The username or password you entered is incorrect. Please try
            again.
          </p>
        </div>
      )}
      {passwordsDoNotMatch && (
        <div className="wrongPassword">
          <p className="wrongPasswordText">
            The passwords you entered do not match. Please try again.
          </p>
        </div>
      )}
      {checkUsername && (
        <div className="wrongPassword">
          <p className="wrongPasswordText">
            The username you entered is already taken. Login instead.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {method !== "login" && (
          <div>
              <div>
                <label htmlFor="username">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="username">Last Name:</label>
                <input
                  type="text"
                  id="last_name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
        </div>
        )}
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
        {/* If user does not have an account they can create one. */}
        {method === "login" && (
          <a href="/signup">Don't Have an Account? Sign Up</a>
        )}
        {method === "signup" && (
          <a href="/login">Login here</a>
        )}
      </form>
    </div>
  );

}

