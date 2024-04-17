import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ItemListings from "../../Components/ItemListings";

const Profile = () => {
  // Initial state for name and bio
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  // State to control whether editing mode is enabled
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleNameChange();
  }, []);

  // Handler functions to update name and bio
  const handleNameChange = (e) => {
    api
      .get("/api/profile/")
      .then((res) => res.data)
      .then((data) => {
        setName(data.results[0].first_name + " " + data.results[0].last_name);
        setBio(data.results[0].description);
        setDescription(data.results[0].sub_description);
      });
  };


  // Toggle editing mode
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const logMeOut = () => {
    navigate("/logout");
    window.location.reload();
  };

  const createNewListing = () => {
    navigate("/newlistingform");
    window.location.reload();
  };

  return (
    <div className="profile">
      <div className="edit-button-container">
        <button className="edit-button" onClick={toggleEditing}>
          {editing ? "Save" : "Edit"}
        </button>
        <button className="add-dish-button" onClick={createNewListing}>Add New Dish</button>
        <button className="add-dish-button" onClick={logMeOut}>
          Logout
        </button>
      </div>
      <div className="profile-info">
        <div className="profile-picture">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-details">
          {editing ? (
            <input
              type="text"
              className="profile-name-input"
              onChange={handleNameChange}
              value={name}
            />
          ) : (
            <h1 className="profile-name">{name}</h1>
          )}
          {editing ? (
            <textarea
              className="profile-bio-input"
              value={bio}
            />
          ) : (
            <p className="profile-bio">{bio}</p>
          )}
          {editing ? (
            <input
              type="text"
              className="contact-input"
              value={description}
            />
          ) : (
            <p className="contact">{description}</p>
          )}
        </div>
      </div>
      <ItemListings />
    </div>
  );
};

export default Profile;
