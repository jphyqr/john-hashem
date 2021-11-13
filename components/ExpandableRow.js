import React, { useRef, useState } from "react";
import { useRect } from "../hooks/useRect";

const ExpandableRow = ({ parentComponent, children, color = "aliceblue" }) => {
  const renderParent = () => {
    let ShowComponent;

    if (parentComponent) {
      ShowComponent = parentComponent;
      return <ShowComponent />;
    }

    return <div></div>;
  };

  const itemsRef = useRef(null);
  const itemsRect = useRect(itemsRef);
  const parentRef = useRef(null);
  const parentRect = useRect(parentRef);
  console.log(itemsRect);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='expandable-row'>
      <div
        className='parent'
        ref={parentRef}
        onClick={(state) => setExpanded(!expanded)}
      >
        {renderParent()}
      </div>
      {/* <h1 onClick={(state) => setExpanded(!expanded)}>{parent}</h1> */}

      <div className='items' ref={itemsRef}>
        {children}
      </div>

      <style jsx>{`
        .parent {
          z-index: 1;

          position: absolute;
          min-height: ${parentRect.height}px;
          top: 0;
          background-color: ${color};
        }
        .items {
          position: absolute;
          top: 0;
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          opacity: ${!expanded ? 0 : 1};
          z-index: ${!expanded ? -1 : 1};

          transform: ${!expanded
            ? `translateY(-${itemsRect.height}px)`
            : `translateY(${parentRect.height}px)`};
          transition: 0.8s all ease;
        }

        .expandable-row {
          display: table;
          min-height: ${parentRect.height}px;

          width: 100%;
          background-color: ${color};

          padding-left: 5px;
          padding-right: 5px;
          flex-direction: column;
          padding-top: ${expanded ? parentRect.height : 0}px;
          padding-bottom: ${expanded ? itemsRect.height : 0}px;
          transition: 0.8s padding-top ease;
          transition: 0.8s padding-bottom ease;
          margin-bottom: 10px;
          overflow: hidden;
          position: relative;
        }

        .parent:before {
          content: "${expanded ? "Ⅹ" : "↓"}";
          font-size: 15px;
          opacity: 0.5;
          line-height: ${parentRect.height}px;
          vertically-align: center;
          position: absolute;
          left: ${parentRect.width + 20}px;
          transform: ${expanded ? "rotateZ(180deg)" : ""};
          transition: 0.8s transform ease;
        }
      `}</style>
    </div>
  );
};

export default ExpandableRow;
