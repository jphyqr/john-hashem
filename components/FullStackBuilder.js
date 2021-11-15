import React, { useRef } from "react";
import { useRect } from "../hooks/useRect";

const FullStackBuilder = ({ backgroundColor, fontColor }) => {
  const containerRef = useRef();

  const height = containerRef?.current?.parentElement?.offsetHeight;
  const width = containerRef?.current?.parentElement?.offsetWidth;
  return (
    <article ref={containerRef}>
      <div className='title'>Full Stack Developer + Product Manager </div>
      <style jsx>{`
        .title {
          top: 50%;
          font-size: 18px;
          width: 100%;
          text-align: center;
        }
        .fed,
        .product {
          height: ${height * 0.5}px;
          width: ${height * 0.5}px;
          border: 1px solid white;
          border-radius: 50%;
          top: 50%;
          left: 33%;
        }

        .fed:before {
          content: "Full Stack Developer";
          top: 50%;
          transform: translate(-25%, -50%);
          width: 300%;
          position: absolute;
          font-size: 10px;
        }
        .product {
          left: 66%;
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
        div {
          position: absolute;

          transform: translate(-50%, -50%);
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
