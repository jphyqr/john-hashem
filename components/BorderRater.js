import e from "cors";
import React, { useMemo, useRef } from "react";
import { useRect } from "../hooks/useRect";

const BorderRater = ({ child, max, value, width = 1, color }) => {
  console.log("BORDER RATER RENDERED");
  const percentage = (value / max) * 100;

  const p =
    percentage <= 50 ? (18 / 5) * percentage - 90 : (18 / 5) * percentage - 270;
  console.log("for", value, "p:", p);
  const childRef = useRef(null);
  const childRect = useRect(childRef);
  const renderChild = () => {
    let ShowComponent;

    //  if (!_.isEmpty(modalComponent)) {
    if (child) {
      ShowComponent = child;
      return <ShowComponent />;
    }

    //    }

    // if (profile.isLoaded && !profile.isEmpty)
    //   Object.keys(verificationMap).map((modal) => {
    //     if (!profile[`${modal}`]) {
    //       dispatch({ type: SET_MODAL, payload: modals[`${modal}`] });
    //     }
    //   });

    return <div></div>;
  };

  return (
    <div className='border-rater'>
      <div className={`${percentage > 50 ? "over50" : "circle-border "} `} />
      <div ref={childRef} className='child'>
        {renderChild()}
      </div>

      <style jsx>{`
  


        .border-rater {
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          min-height: ${childRect.height + 2 * width}px;
          min-width: ${childRect.width + 2 * width}px;
        }

        .child {
          position: absolute;
      
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          overflow: hidden;
        }

.circle-border, .over50{
    width: ${childRect.height + 2 * width}px;
    height: ${childRect.height + 2 * width}px;
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
