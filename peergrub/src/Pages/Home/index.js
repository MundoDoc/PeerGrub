import React from 'react';
import './index.css';
import Slideshow from '../../Components/Slideshow'; // Adjust the import path based on your file structure
import AllFood from '../../Assets/AllFood.JPG';

export default function Home() {
  return (
    <div className='homeDiv'>
      <div className='homeStory'>
        <img className="allImage" src={AllFood} alt='logo' />
        <h1 className='imageText'>Welcome to the Foodie App</h1>
      </div>
      <Slideshow />
    </div>
  );
}
