import React, { useState } from "react";
import "./index.css";

const NewListingForm = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState([]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="new-listing-form">
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Photo:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <input
            type="text"
            id="cost"
            value={cost}
            onChange={handleCostChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={handleIngredientsChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Allergens:</label>
          <div className="allergen-options">
            <button
              className={allergens.includes("Nuts") ? "active" : ""}
              onClick={() => handleAllergenChange("Nuts")}
            >
              Nuts
            </button>
            <button
              className={allergens.includes("Dairy") ? "active" : ""}
              onClick={() => handleAllergenChange("Dairy")}
            >
              Dairy
            </button>
            <button
              className={allergens.includes("Eggs") ? "active" : ""}
              onClick={() => handleAllergenChange("Eggs")}
            >
              Eggs
            </button>
            <button
              className={allergens.includes("Gluten") ? "active" : ""}
              onClick={() => handleAllergenChange("Gluten")}
            >
              Gluten
            </button>
            <button
              className={allergens.includes("Soy") ? "active" : ""}
              onClick={() => handleAllergenChange("Soy")}
            >
              Soy
            </button>
            {/* Add more allergen buttons */}
            <button
              className={allergens.includes("Other") ? "active" : ""}
              onClick={() => handleAllergenChange("Other")}
            >
              Other
            </button>
          </div>
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default NewListingForm;
