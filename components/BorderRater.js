import React, { useRef } from "react";

const BorderRater = ({ children: child, max, value, width = 1, color }) => {
  const childRef = useRef(child);
  const percentage = (value / max) * 100;

  const p =
    percentage <= 50 ? (18 / 5) * percentage - 90 : (18 / 5) * percentage - 270;
  console.log("for", value, "p:", p);
  return (
    <div className='border-rater'>
      <div className={`${percentage > 50 ? "over50" : "circle-border "} `} />
      <div className='child'>{child}</div>

      <style jsx>{`
  


        .border-rater {
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          min-height: ${child.props.height + 2 * width}px;
          min-width: ${child.props.width + 2 * width}px;
        }

        .child {
          position: absolute;
          height: ${child.props.height}px;
          width: ${child.props.width}px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          overflow: hidden;
        }

.circle-border, .over50{
    width: ${child.props.height + 2 * width}px;
    height: ${child.props.height + 2 * width}px;
    display: inline-block;
    border-radius: 50%;
padding ${width}px;

}
        .circle-border {
     
            background: linear-gradient(#ccc, #ccc) content-box,
              linear-gradient(${p}deg, #f2f2f2 50%, transparent 0),
              linear-gradient(to right, #f2f2f2 50%, ${color} 0);
          }


        .over50{
            background:
            linear-gradient(#ccc,#ccc) content-box,
            linear-gradient(${p}deg, ${color} 50%,transparent 0),
            linear-gradient(to right, #f2f2f2 50%,${color} 0); 
        }

      
      `}</style>
    </div>
  );
};

export default BorderRater;