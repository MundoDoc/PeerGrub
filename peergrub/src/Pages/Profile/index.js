import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ItemListings from "../../Components/ItemListings";

const Profile = () => {
  // Initial state for name and bio
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [contact, setContact] = useState("Contact Me");

  // State to control whether editing mode is enabled
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  // Handler functions to update name and bio
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
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
              value={name}
              onChange={handleNameChange}
            />
          ) : (
            <h1 className="profile-name">{name}</h1>
          )}
          {editing ? (
            <textarea
              className="profile-bio-input"
              value={bio}
              onChange={handleBioChange}
            />
          ) : (
            <p className="profile-bio">{bio}</p>
          )}
          {editing ? (
            <input
              type="text"
              className="contact-input"
              value={contact}
              onChange={handleContactChange}
            />
          ) : (
            <p className="contact">{contact}</p>
          )}
        </div>
      </div>
      <ItemListings />
    </div>
  );
};

export default Profile;
