import React, { useRef } from "react";

const BorderRater = ({ children: child, max, value, width = 1, color }) => {
  const childRef = useRef(child);

  const degree = (value / max) * 360;
  const p = (18 / 5) * (value / max) * 100 - 90;
  console.log(p);
  return (
    <div className='border-rater'>
      <div className={`circle-border ${degree > 270 ? "over270" : ""} `} />
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

.circle-border, .over270{
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
        .over270{
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
