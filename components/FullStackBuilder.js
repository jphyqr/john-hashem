import React, { useRef } from "react";
import { useRect } from "../hooks/useRect";

const FullStackBuilder = ({ backgroundColor, fontColor }) => {
  const containerRef = useRef();

  const height = containerRef?.current?.parentElement?.offsetHeight;
  const width = containerRef?.current?.parentElement?.offsetWidth;
  return (
    <article ref={containerRef}>
      <div className='product'>
        <div className='product-circle' />
      </div>

      <div className='fed'>
        <div className='fed-circle' />
      </div>
      <style jsx>{`
        .title {
          top: 50%;
          font-size: 18px;
          width: 100%;
          text-align: center;
        }

        .product, .fed{
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%,-50%);
           
          }
        .fed-circle,
        .product-circle {
          height: ${height * 0.5}px;
          width: ${height * 0.5}px;
          border: 1px solid white;
          border-radius: 50%;
         
          position: relative;
        }

        .fed-circle:before, .product-circle:before{
            content: "Product";
            position: absolute;
            top:0%;
            left: 50%;
            transform: translate(-50%, -30px);
        }

      .fed-circle:before{
          content: "Front-Endgineer";
         
          white-space: nowrap;
        
      }
   
        .fed {
          left: calc(50% - 50px);
          top: 50%;
        }
        .product{
            left: calc(50% + 50px);
            top: 50%;
        }
        article {
          height: ${height}px;
          width: ${width}px;
          display: inline-block;
background-color ${backgroundColor};
color: ${fontColor};
          position: relative;
  
          margin: 0;
          padding: 0;
        }
     
        .title {
          top: 50%;
          left: 50%;
        }

  
      `}</style>
    </article>
  );
};

export default FullStackBuilder;
