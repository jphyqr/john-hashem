import React from "react";

const HeroImage = ({ image }) => {
  return (
    <div className='hero-image-container'>
      <img
        className='hero-image'
        style={{
          height: "auto",
          maxHeight: "200px",
          width: "auto",
          maxWidth: "100%",
        }}
        src={image}
      ></img>

      <style jsx>{`
        .title,
        .description,
        .secondary {
          position: absolute;

          font-size: 30px;
          color: white;

          left: 0px;
          z-index: 20;
        }

        .hero-image-container {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: scroll;
          align-items: center;
          height: 200px;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default HeroImage;
