import React, { useRef } from "react";
import { useRect } from "../../hooks/useRect";
import Cube from "./Cube";
const Block = ({ data, index, length, appear, ...props }) => {
  const rightHand = index % 2 === 1 ? true : false;
  if (!appear) return <div></div>;
  return (
    <div className={`block ${appear ? "appear" : "hide"}`}>
      <div className={`data-container `}>
        {data.h1 && (
          <h1 className={rightHand ? "right-hand" : "left-hand"}>{data.h1}</h1>
        )}
        {data.h2 && (
          <h2 className={`delay ${rightHand ? "right-hand" : "left-hand"}`}>
            {data.h2}
          </h2>
        )}
      </div>
      {appear && (
        <div className={`cube-container`}>
          <Cube
            svgX={data.svgX || []}
            svgY={data.svgY}
            index={index}
            side={50}
            {...props}
          />
        </div>
      )}

      <style jsx>{`
        h1,
        h2 {
          transform: ${rightHand ? "translateX(100%)" : "translateX(-100%)"};
        }

        .left-hand {
          animation: slide-in-left 0.4s linear forwards;
        }

        .right-hand {
          animation: slide-in-right 0.4s linear forwards;
        }

        .delay {
          animation-delay: 1s;
        }
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes slide-in-right {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .cube-container,
        .data-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .right {
          flex-order: 0;
        }
        .left {
          left: 0;
        }
        .hide {
          opacity: 0;
        }
        .block {
          display: flex;
          flex-direction: ${index % 2 === 0 ? "row" : "row-reverse"};
          justify-content: space-between;
          width: 100%;
          min-height: 200px;
        }

        .appear {
          opacity: 1;
          transition: 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Block;
