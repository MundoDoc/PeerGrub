import React, { useState } from "react";
import "./index.css";
import Macarons from "../../Assets/Macarons.JPG";
import ChickenParm from "../../Assets/ChickenParm.JPG";
import Raviolis from "../../Assets/Raviolis.JPG";

const Profile = () => {
  // Initial state for name and bio
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [contact, setContact] = useState("Contact Me");

  // State to control whether editing mode is enabled
  const [editing, setEditing] = useState(false);

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

  // JSX for profile page
  return (
    <div className="profile">
      <div className="edit-button-container">
        <button className="edit-button" onClick={toggleEditing}>
          {editing ? "Save" : "Edit"}
        </button>
        <button className="add-dish-button">Add New Dish</button>
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
      <div class="item-listing">
        <div class="item">
          <img src={ChickenParm} alt="Placeholder Image" />
          <h2>Dish 1</h2>
          <p>Description of Dish 1</p>
          <p>Price: $10</p>
        </div>
        <div class="item">
          <img src={Macarons} alt="Placeholder Image" />
          <h2>Dish 2</h2>
          <p>Description of Dish 2</p>
          <p>Price: $12</p>
        </div>
        <div class="item">
          <img src={Raviolis} alt="Placeholder Image" />
          <h2>Dish 3</h2>
          <p>Description of Dish 3</p>
          <p>Price: $8</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
