import React, { useEffect, useState } from "react";
import HeroImage from "./HeroImage";

const HeroSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (imageIndex === images.length - 1) return;
      setImageIndex(imageIndex + 1);
    }, 4000);
  }, [imageIndex]);
  return (
    <div className='hero-image-slider'>
      {images?.map((image, i) => {
        return <HeroImage image={image} key={i} />;
      })}

      <style jsx>{`
        .hero-image-slider {
          width: ${images.length * 100}%;
          flex-grow: 1;
          overflow-x: hidden;
          display: flex;
          max-height: 200px;
          transform: translateX(-${(100 / images.length) * imageIndex}%);
          transition: 2s all ease;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
