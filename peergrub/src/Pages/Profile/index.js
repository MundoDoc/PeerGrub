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
  const [picture, setPicture] = useState("");

  // State to control whether editing mode is enabled
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleNameChange();
    handleGetPicture();
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
        setPicture(data.results[0].profile_image);
        console.log(data.results[0]);
      });
  };

  const handleUploadPicture = (event) => {
    const file = event.target.files[0]; // Get the file from the event
    if (!file) {
      console.error('No file selected.');
      return;
    }
  
    api
      .post("/api/profile/upload_picture/", {
        file: file,
      })
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

  const handleGetPicture = () => {
    api
      .get("/api/profile/")
      .then((res) => res.data)
      .then((data) => {
        setPicture(data.results[0].profile_image);
        if (picture === null) {
          setPicture("https://via.placeholder.com/150");
        }
        console.log(picture);
      });
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
          <img src={picture} alt="Profile" />
        </div>
        <div className="profile-details">

          <h1 className="profile-name">{name}</h1>
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
          {editing && (
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="file" onChange={handleUploadPicture} />
              <button type="submit">Upload Picture</button>
            </form>
          )}
        </div>
      </div>
      <ItemListings />
    </div>
  );
};

export default Profile;
