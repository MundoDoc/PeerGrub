import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";
import ItemListings from "../../Components/ItemListings";
import StockImage from "../../Assets/stockImage.png";
import { ACCESS_TOKEN } from "../../constants";

const Profile = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); // Assuming you want to separately handle last name
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [picture, setPicture] = useState(StockImage);
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userID, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/set-csrf-cookie/', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(() => console.log('CSRF cookie set'))
    .catch(error => console.error('Error setting CSRF cookie:', error));
    
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    api.get("/api/profile/").then((res) => {
      const data = res.data.results[0]; // Assuming the first result is the user's profile
      setName(`${data.first_name} ${data.last_name}`);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setBio(data.description);
      setDescription(data.sub_description);
      setPicture(data.profile_image || StockImage);
      setUserID(data.id);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "bio":
        setBio(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "subDescription":
        setSubDescription(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("description", bio);
    formData.append("sub_description", description);
    formData.append("profile_image", file);

    const csrfToken = Cookies.get('csrftoken');
    try {
      const response = await fetch(`http://localhost:8000/api/profile/${userID}/`, {
        method: 'PATCH', // Assuming the endpoint is set for PATCH request
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save profile: ${errorData}`);
      }
      alert('Profile saved successfully!');
      setEditing(false); // Disable editing mode after save
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile: ' + error.message);
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const logMeOut = () => {
    localStorage.removeItem(ACCESS_TOKEN); // Clear the token
    navigate("/logout");
  };

  return (
    <div className="profile">
      <div className="edit-button-container">
        <button className="edit-button" onClick={toggleEditing}>{editing ? "Save" : "Edit"}</button>
        <button className="add-dish-button" onClick={handleSaveProfile}>{editing ? "Save Profile" : "Edit Profile"}</button>
        <button className="add-dish-button" onClick={logMeOut}>Logout</button>
      </div>
      <div className="profile-info">
        <div className="profile-picture">
          <img src={picture} alt="Profile" />
          {editing && <input type="file" onChange={handleFileChange} />}
        </div>
        <div className="profile-details">
          <h1 className="profile-name">{name}</h1>
          {editing ? <textarea name="bio" value={bio} onChange={handleInputChange} /> : <p className="profile-bio">{bio}</p>}
          {editing ? <input name="description" type="text" value={description} onChange={handleInputChange} /> : <p className="contact">{description}</p>}
        </div>
      </div>
      <ItemListings />
    </div>
  );
};

export default Profile;
