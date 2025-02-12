import React from 'react'
import "../styles/Slide.scss"
import { slideImages } from '../data';
import { useState, useEffect } from 'react';



const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="Slide"
      style={{ backgroundImage: `url(${slideImages[currentIndex]})` }}
    >
      <h1>
        Welcome Home – No Matter Where You Are<br /> Stay. Explore. Make Memories.
      </h1>
    </div>
  )
}

export default Slide;