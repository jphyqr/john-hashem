import React, { useRef } from "react";
import { useRect } from "../../hooks/useRect";
import Cube from "./Cube";
const Block = ({ data, index, animationDone, length, appear, ...props }) => {
  const rightHand = index % 2 === 1 ? true : false;
  if (!appear && !animationDone) return <div></div>;
  return (
    <div className={`block ${appear || animationDone ? "appear" : "hide"}`}>
      {/* <div className='vs-10' />
      {data.h1 && (
        <h1
          className={
            data.header ? "header" : rightHand ? "right-hand" : "left-hand"
          }
        >
          {data.h1}
        </h1>
      )} */}
      <div className={`row`}>
        <div className='data-container'>
          <h3>{data.h1}</h3>
          <ul>
            {data.ul?.map((li, i) => {
              return (
                <li
                  className={`${
                    rightHand ? "step-slide-in-right" : "step-slide-in-left"
                  }`}
                  key={i}
                >
                  {li}
                </li>
              );
            })}
          </ul>
        </div>
        {(appear || animationDone) && !data.header && (
          <div className={`cube-container`}>
            <Cube
              vision={data.vision ? true : false}
              validate={data.validate ? true : false}
              velocity={data.velocity ? true : false}
              animationDone={animationDone}
              paint={false}
              svgX={data.svgX || []}
              svgY={data.svgY}
              index={index}
              rightHanded={index % 2 === 0 || data.header}
              side={50}
              {...props}
            />
          </div>
        )}
      </div>
      <div className='vs-30' />
      <style jsx>{`
        .vs-30 {
          height: 50px;
        }
        h1 {
          font-size: 50px;
        }
        h1,
        h2,
        li {
          transform: ${rightHand ? "translateX(100%)" : "translateX(-100%)"};
        }

        li:nth-child(1) {
          --nth-child: 1;
        }
        li:nth-child(2) {
          --nth-child: 2;
        }
        li:nth-child(3) {
          --nth-child: 3;
        }

        .header {
          width: 100%;
          text-align: center;
        }

        .left-hand,
        .header {
          animation: slide-in-left 0.4s linear forwards;
        }

        .step-slide-in-left {
          animation: slide-in-left 0.3s linear forwards;
          animation-delay: calc(var(--nth-child) * 0.1s);
        }
        .step-slide-in-right {
          animation: slide-in-right 0.4s linear forwards;
          animation-delay: calc(var(--nth-child) * 0.1s);
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
        .data-container {
          width: 50%;
        }
        .cube-container {
          width: 50%;
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
          flex-direction: column;
          width: 100%;
          min-height: 200px;
        }
        .row {
          width: 100%;
          align-items: center;
          display: flex;
          flex-direction: ${index % 2 === 0 ? "row" : "row-reverse"};
          justify-content: space-evenly;
        }

        h1 {
          text-align: ${index % 2 === 0 ? "start" : "end"};
          margin: 0;
          padding: 0;
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
