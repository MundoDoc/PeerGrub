import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";
import ItemListings from "../../Components/ItemListings";
import StockImage from "../../Assets/stockImage.png";
import { ACCESS_TOKEN } from "../../constants";

const Profile = () => {
  const [allListings, setAllListings] = useState([]);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
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
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
        console.log("No access token found, redirecting to login.");
        navigate("/login");
        return;
    }

    api.get('/api/profile/', {  // Assumes there is only one profile per user
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      if (res.status === 200 && res.data) {
        setName(`${res.data.results[0].first_name} ${res.data.results[0].last_name}`);
        setFirstName(res.data.results[0].first_name);
        setLastName(res.data.results[0].last_name);
        setBio(res.data.results[0].description);
        setDescription(res.data.results[0].sub_description);
        setPicture(res.data.results[0].profile_image || StockImage);
        setUserID(res.data.results[0].id);

        // Fetch listings specific to this user
        fetchUserListings(res.data.results[0].user_profile);
      }
    })
    .catch((err) => {
        console.error("Error fetching profile:", err);
        alert('Error fetching profile data.');
    });
};

const fetchUserListings = (userId) => {
    api.get(`/api/listing/?user_id=${userId}`)
    .then((res) => {
      if (res.status === 200 && res.data) {
        setAllListings(res.data.results);  // Assuming the data comes in an array
      }
    })
    .catch((err) => {
        console.error("Error fetching user listings:", err);
        alert('Error fetching user listings.');
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
      default:
        break;
    }
  };

  const handleNav = () => {
    navigate("/createlisting");
  }

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

    // Append the profile_image only if a new file has been selected and it's not been used already
    if (file && file !== StockImage) {
      formData.append("profile_image", file);
      setFile(null); // Immediately reset file state to prevent reuse
    }
  
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      console.log("No access token found, redirecting to login.");
      navigate("/login");
      return;
    }
  
    const csrfToken = Cookies.get('csrftoken');
    try {
      const response = await fetch(`http://localhost:8000/api/profile/${userID}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken
        },
        credentials: 'include'
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await response.json();
            alert(`Failed to save profile: ${JSON.stringify(errorData)}`);
        } else {
            const errorText = await response.text();
            alert(`Failed to save profile: ${errorText}`);
        }
      } else {
        alert('Profile saved successfully!');
        setEditing(false); // Disable editing mode after save
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile: ' + error.message);
    }
};

const deleteListing = (id) =>{

  api
      .delete(`/api/listing/delete/${id}/`)
      .then((res) => {
        if(res.status === 204) {
         alert("Listing deleted successfully!");
         window.location.reload();
        }
      })
      .catch((err) => alert(err));
}
  
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const logMeOut = () => {
    localStorage.removeItem(ACCESS_TOKEN); // Clear the token
    navigate("/logout");
  };

  return (
    <div className="profile">
      <div className="profile-header">
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
        <div className="edit-button-container">
          {editing && <button className="edit-button" onClick={handleSaveProfile}>Save</button>}
          {!editing && <button className="edit-button" onClick={toggleEditing}>Edit</button>}
          <button className="add-dish-button" onClick={handleNav}>Create Listing</button>
          <button className="add-dish-button" onClick={logMeOut}>Logout</button>
        </div>
      </div>
      <div className="listings">
        {allListings.map((newList) => (
          <ItemListings route="profile" newList={newList} onDelete={deleteListing} key={newList.id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;