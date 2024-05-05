import React from 'react';
import './index.css';
import Slideshow from '../../Components/Slideshow'; // Adjust the import path based on your file structure
import AllFood from '../../Assets/AllFood.JPG';
import SpotLight from '../../Components/SpotLight'; // Adjust the import path based on your file structure

export default function Home(){

  return (
    <div className='homeDiv'>
      <div className='homeStory'>
        <img className="allImage" src={AllFood} alt='logo' />
        <h1 className='imageText'>Welcome to the Foodie App, foodies</h1>
      </div>
      <Slideshow />
      <SpotLight />
    </div>
  );
}