import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure this is the correct path to your CSS file
import Muffins from "../../Assets/Muffins.png";
import MuffinsStanding from '../../Assets/MuffinsStanding.JPG';
import Macarons from '../../Assets/Macarons.JPG';
import ChickenParm from '../../Assets/ChickenParm.JPG';
import Raviolis from '../../Assets/Raviolis.JPG';

const images = [
  Muffins,
  MuffinsStanding,
  Macarons,
  ChickenParm,
  Raviolis,
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      moveSlide(-1); // Move to the next slide
    }, 7000); // Change slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [currentIndex]); // Depend on currentIndex to reset timer if manually navigated

  const moveSlide = (n) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex >= images.length) {
        newIndex = 0; // Wrap around to the first slide
      } else if (newIndex < 0) {
        newIndex = images.length - 1; // Wrap around to the last slide
      }
      return newIndex;
    });
  };

  // Calculate index for left, middle, and right images
  const getSlideIndex = (n) => {
    let index = currentIndex + n;
    if (index >= images.length) {
      index -= images.length;
    } else if (index < 0) {
      index += images.length;
    }
    return index;
  };

  return (
    <div id="slideshow-container">
      <div onClick={() => moveSlide(-1)} className="slide left">
        <img className="imgStyle" src={images[getSlideIndex(-1)]} alt="Left Slide" style={{ width: '100%' }} />
      </div>
      <div className="slide middle">
        <img className="imgStyle" src={images[currentIndex]} alt="Middle Slide" style={{ width: '100%' }} />
      </div>
      <div onClick={() => moveSlide(1)} className="slide right">
        <img className="imgStyle" src={images[getSlideIndex(1)]} alt="Right Slide" style={{ width: '100%' }} />
      </div>
      <a className="prev" onClick={() => moveSlide(-1)}>&#10094;</a>
      <a className="next" onClick={() => moveSlide(1)}>&#10095;</a>
    </div>
  );
}
