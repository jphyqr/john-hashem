import React, { useEffect, useRef, useState } from "react";
import { useRect } from "../../hooks/useRect";
import _ from "lodash";
import { useScreenWidth } from "../../hooks/outsideClick";
const Cube = ({
  side,
  svgY,
  svgX,
  index,
  setCubeRefs,
  paint,
  rightHanded,
  previousBlockPosition,
}) => {
  let cubeRef = useRef();
  let cubeRect = useRect(cubeRef);

  const [screenWidth] = useScreenWidth();

  const containerRef = useRef();
  let containerRect = useRect(containerRef);
  const [containingBlockDims, setContainingBlockDims] = useState(null);

  useEffect(() => {
    if (!containerRef?.current) return;

    setContainingBlockDims((state) => ({
      ...state,
      height:
        containerRef.current.parentElement.parentElement.parentElement
          .offsetHeight,
      width:
        containerRef.current.parentElement.parentElement.parentElement
          .offsetWidth,
    }));
  }, [containerRef?.current]);

  useEffect(() => {
    if (!cubeRect?.bottom) return;
    setCubeRefs((state) => ({ ...state, [index]: cubeRect }));
  }, [cubeRect.bottom]);

  const [f, u] = useState(0);

  useEffect(() => {
    u(f + 1);
  }, [containerRef?.height, containerRef?.width]);
  let cubeMargin = rightHanded ? screenWidth - cubeRect.right : cubeRect.left;

  console.log("cube margin for cube", index, cubeMargin);
  const [_parentsSide, setParentsSide] = useState(0);
  const xMiddle = cubeRect.left + cubeRect.width / 2;
  const yTop = containerRect.height / 2 - cubeRect.height / 2;
  console.log("container rect height", containerRect.height);
  const svgHeight = cubeRect?.top - previousBlockPosition?.bottom;
  const svgWidth = rightHanded
    ? cubeRect?.left - previousBlockPosition?.left
    : previousBlockPosition?.left - cubeRect?.left;

  return (
    <div ref={containerRef} className='container'>
      <svg
        className={rightHanded ? "right-svg" : "left-svg"}
        height={svgHeight}
        width={svgWidth}
      >
        <path
          className='path right'
          stroke='purple'
          stroke-width='1'
          fillOpacity='0'
          //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
          // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,41.5s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
          // C46.039,146.545,53.039,128.545,66.039,133.545z'
          d={
            rightHanded
              ? `M${svgWidth},${svgHeight} L ${svgWidth},${
                  svgHeight - containingBlockDims?.height / 2
                } L ${0}, ${
                  svgHeight - containingBlockDims?.height / 2
                } L${0}, ${0}`
              : `M${0},${svgHeight} L ${0},${
                  svgHeight - containingBlockDims?.height / 2
                } L ${svgWidth}, ${
                  svgHeight - containingBlockDims?.height / 2
                } L${svgWidth}, ${0}`
          }
        />
      </svg>
      {_.times(svgX.length, (i) => {
        return (
          <div
            key={i}
            style={{
              height: 5,
              width: 5,
              backgroundColor: "white",

              transform: `${
                paint
                  ? `translate(-50%,-50%)`
                  : `translate(${Math.random() * 1000 - 500}px, -${
                      Math.random() * 300
                    }px)`
              }`,
              left: `calc(50% - ${svgX[i]}px)`,
              top: `calc(50% - ${svgY[i]}px)`,
            }}
            className={`data `}
          ></div>
        );
      })}
      <div className='scene'>
        <div ref={cubeRef} className={`cube ${paint ? "" : "animate-cube"}`}>
          <div className='cube__face cube__face--front'></div>
          <div className='cube__face cube__face--back'></div>
          <div className='cube__face cube__face--right'></div>
          <div className='cube__face cube__face--left'></div>
          <div className='cube__face cube__face--top'></div>
          <div className='cube__face cube__face--bottom'></div>
        </div>
      </div>
      <style jsx>{`
      .data{
        position: absolute;
        
        animation: center ${index < 2 ? "1.5" : ".5"}s forwards;
     
      }
@keyframes center {
  0%{
    background-color: white;
    opacity: 0;
  }
  100%{
    background-color: white;
    transform: translate(-50%,-50%);
    opacity: .7;
  }
}
      .container{
        position: relative;
      
      }

      svg {
        position: absolute;
       z-index: 1;
      //  background-color: white;
      //  opacity: 0.3;

 bottom: 0;

       transform: ${
         rightHanded
           ? `translate(-${containerRect.width / 2}px,-${
               (containerRect.height + cubeRect.height) / 2
             }px)`
           : `translate(${containerRect.width / 2}px, -${
               (containerRect.height + cubeRect.height) / 2
             }px)`
       } ;
      }

      .right-svg{
        right:0;
      }
      .left-svg{
left:0;
      }
        .path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 0.1s linear forwards;
        }

        .right{
          animation-delay: ${index < 2 ? "1" : ".3"};
          animation-duration: ${index < 2 ? ".5" : ".2"}s;
        }
        @keyframes dash {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .scene {
          width: ${side}px;
          height: ${side}px;

          margin: 80px;
          position: relative;
    
        }

    

        .cube {
          width: ${side}px;
          height: ${side}px;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(-${side / 2}px)
          transition: transform 1s;
position: relative;
      
        }
        
        .animate-cube{
          animation: spin ${index < 2 ? "1.5" : ".5"}s linear forwards;
        }
    
        @keyframes spin {
            0% {
              transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
            }
            
            100% {
              transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
            }
          }
        .cube.show-front {
          transform: translateZ(-${side / 2}px) rotateY(0deg);
        }
        .cube.show-right {
          transform: translateZ(-${side / 2}px) rotateY(-90deg);
        }
        .cube.show-back {
          transform: translateZ(-${side / 2}px) rotateY(-180deg);
        }
        .cube.show-left {
          transform: translateZ(-${side / 2}px) rotateY(90deg);
        }
        .cube.show-top {
          transform: translateZ(-${side / 2}px) rotateX(-90deg);
        }
        .cube.show-bottom {
          transform: translateZ(-${side / 2}px) rotateX(90deg);
        }

        .cube__face {
          position: absolute;
          width: ${side}px;
          height: ${side}px;
          border: 2px solid purple;
          line-height: ${side}px;
          font-size: 40px;
          font-weight: bold;
          color: white;
          text-align: center;
            overflow: hidden;
        }

    .cube__face:before{
            content: "";
            position: absolute;
            width: ${side * 1.5}px;
            height: ${side * 1.5}px;
            top: 50%;
            left:50%;
            transform: translate(-50%, -50%);
            border: 3px solid purple;
            animation: border-grow 1.5s linear forwards;
          box-sizing: border-box;
        }

        @keyframes border-grow {
            0%{
                opacity: 0;
                border-width: 0px;
                border-radius: 50% 10% 20% 5%;
            }

            100%{
                border-width: 300px;
                opacity: .5;
                    border-radius: 50% 10% 20% 5%;
            }
        }
        // .cube__face--front {
        //   background: hsla(0, 100%, 50%, 0.7);
        // }
        // .cube__face--right {
        //   background: hsla(60, 100%, 50%, 0.7);
        // }
        // .cube__face--back {
        //   background: hsla(120, 100%, 50%, 0.7);
        // }
        // .cube__face--left {
        //   background: hsla(180, 100%, 50%, 0.7);
        // }
        // .cube__face--top {
        //   background: hsla(240, 100%, 50%, 0.7);
        // }
        // .cube__face--bottom {
        //   background: hsla(300, 100%, 50%, 0.7);
        // }

        .cube__face--front {
          transform: rotateY(0deg) translateZ(${side / 2}px);
        }
        .cube__face--right {
          transform: rotateY(90deg) translateZ(${side / 2}px);
        }
        .cube__face--back {
          transform: rotateY(180deg) translateZ(${side / 2}px);
        }
        .cube__face--left {
          transform: rotateY(-90deg) translateZ(${side / 2}px);
        }
        .cube__face--top {
          transform: rotateX(90deg) translateZ(${side / 2}px);
        }
        .cube__face--bottom {
          transform: rotateX(-90deg) translateZ(${side / 2}px);
        }

        label {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Cube;
