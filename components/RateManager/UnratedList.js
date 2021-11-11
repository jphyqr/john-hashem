import React from "react";
import DraggableLabel from "./DraggableLabel/DraggableLabel";

const UnratedList = ({ items, ...itemProps }) => {
  return (
    <div className='unrated-list-container-hidden'>
      <div className='unrated-list-hidden'>
        {items.map((item, i) => {
          return (
            <DraggableLabel
              item={item}
              totalItems={items.length}
              key={i}
              {...itemProps}
            />
          );
        })}
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default UnratedList;
