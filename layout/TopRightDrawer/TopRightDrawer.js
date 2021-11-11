import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick } from "../../hooks/outsideClick";
import { CLOSE_TOP_RIGHT_DRAWER } from "./topRightDrawerReducer";

const TopRightDrawer = () => {
  const node = useRef(null);

  const opened = useSelector((state) => state.topRightDrawer.opened || false);
  useOutsideClick(node, () => dispatch({ type: CLOSE_TOP_RIGHT_DRAWER }));
  const [_f, f] = useState(0);
  const component = useSelector(
    (state) =>
      state.topRightDrawer.component ||
      function () {
        return <div>Empty</div>;
      }
  );

  const dispatch = useDispatch();

  const renderComponent = () => {
    let ShowComponent;
    if (!component) return <div></div>;
    ShowComponent = component;
    return <ShowComponent />;

    return <div></div>;
  };

  const itemStyle = useMemo(
    () => ({
      transform: opened ? "translate(0, 0)" : "translate(0, -100%)",
    }),
    [opened]
  );
  return (
    <div ref={node} style={itemStyle} className='top-right-drawer'>
      <div className='component-container'>{renderComponent()}</div>

      <style jsx>
        {`
          .component-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .top-right-drawer {
            height: auto;
            width: auto;
            top: 0;
            position: absolute;
            background-color: darkslategrey;
            left: 5px;

            background-color: white;

            position: absolute;

            transition: 0.5s ease;
            z-index: 35;
          }
        `}
      </style>
    </div>
  );
};

export default TopRightDrawer;
