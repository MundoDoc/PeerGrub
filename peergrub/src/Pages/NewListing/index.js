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
  const [tags, setTags] = useState("Food");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/set-csrf-cookie/', {
      credentials: 'include'
      })
      .then(response => response.json())
      .then(() => console.log('CSRF cookie set'))
      .catch(error => console.error('Error setting CSRF cookie:', error));
  })

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
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

  const handleAllergenChange = (allergen) => {
    if (allergens.includes(allergen)) {
      setAllergens(allergens.filter((a) => a !== allergen));
    } else {
      setAllergens([...allergens, allergen]);
    }
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
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
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
        <div className="form-group allergens">
          <label>Allergens:</label>
          <div className="allergen-options">
            <label htmlFor="nuts">Nuts</label>
            <input
              type="checkbox"
              id="nuts"
              value="Nuts"
              checked={allergens.includes("Nuts")}
              onChange={() => handleAllergenChange("Nuts")}
            />

            <label htmlFor="dairy">Dairy</label>
            <input
              type="checkbox"
              id="dairy"
              value="Dairy"
              checked={allergens.includes("Dairy")}
              onChange={() => handleAllergenChange("Dairy")}
            />

            <label htmlFor="eggs">Eggs</label>
            <input
              type="checkbox"
              id="eggs"
              value="Eggs"
              checked={allergens.includes("Eggs")}
              onChange={() => handleAllergenChange("Eggs")}
            />
            
            <label htmlFor="gluten">Gluten</label>
            <input
              type="checkbox"
              id="gluten"
              value="Gluten"
              checked={allergens.includes("Gluten")}
              onChange={() => handleAllergenChange("Gluten")}
            />

            <label htmlFor="soy">Soy</label>
            <input
              type="checkbox"
              id="soy"
              value="Soy"
              checked={allergens.includes("Soy")}
              onChange={() => handleAllergenChange("Soy")}
            />


            {/* Add more allergen checkboxes */}
            <label htmlFor="other">Other</label>
            <input
              type="checkbox"
              id="other"
              value="Other"
              checked={allergens.includes("Other")}
              onChange={() => handleAllergenChange("Other")}
            />

          </div>
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default NewListingForm;
