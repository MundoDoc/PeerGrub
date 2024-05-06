import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from "../../constants";

const NewListingForm = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [author, setAuthor] = useState("");
  const [areaID, setAreaID] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('http://localhost:8000/set-csrf-cookie/', {
          credentials: 'include'
        });
        console.log('CSRF cookie set');
  
        const response = await api.get('/api/profile/', {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
  
        if (response.status === 200 && response.data) {
          setAuthor(`${response.data.results[0].first_name} ${response.data.results[0].last_name}`);
        }
      } catch (error) {
        console.error('Error setting CSRF cookie or fetching profile:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleAreaChange = (event) => {
    setAreaID(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleImageInput = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title === "" || cost === "" || description === "" || ingredients === "" || file === null) {
      alert("Please fill out all required fields");
      return;
    }
    if(areaID < 1 || areaID > 8) {
      alert("Please select a valid area");
      return;
    }
  
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Assuming you're storing the token in localStorage
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      const csrfToken = Cookies.get('csrftoken');
      const headers = {
        "Authorization": `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      };
  
      const formData = new FormData();
      formData.append("Listing_Image", file); // Use the file state directly
      formData.append("Listing_Title", title);
      formData.append("Listing_Cost", cost);
      formData.append("Listing_Descr", description);
      formData.append("Listing_Ingredients", ingredients);
      formData.append("Listing_Author", author)
      formData.append("Listing_Area", areaID);
  
      const response = await api.post("/api/listing/", formData, { headers });
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        navigate("/profile");
      } else {
        throw new Error(`Failed to create listing: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the listing");
    }
  }
  
  

  return (
    <div className="new-listing-form">
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">*Upload Photo:</label>
          <input
            type="file"
            onChange={handleImageInput}
          />
          {image && (
            <img src={image} alt="Preview" className="preview-image" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="title">*Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">*Cost:</label>
          <input
            type="text"
            id="cost"
            value={cost}
            onChange={handleCostChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">*Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">*Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={handleIngredientsChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="area">*Area #(Using Map):</label>
          <input
            type="text"
            id="areaID"
            value={areaID}
            onChange={handleAreaChange}
            required
          />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default NewListingForm;
