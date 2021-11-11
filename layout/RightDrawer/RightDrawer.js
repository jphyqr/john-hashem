import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick, useScreenWidth } from "../../hooks/outsideClick";
import { CLOSE_RIGHT_DRAWER } from "./rightDrawerReducer";

const RightDrawer = () => {
  const [screenWidth, screenHeight] = useScreenWidth();
  const opened = useSelector((state) => state.rightDrawer?.opened || false);
  const component = useSelector(
    (state) => state.rightDrawer?.component || null
  );

  const closeRef = useRef();

  const dispatch = useDispatch();

  const renderComponent = () => {
    let ShowComponent;

    if (component) {
      ShowComponent = component;
      return <ShowComponent />;
    }

    return <div></div>;
  };
  const grabbedItemStyle = useMemo(
    () => ({
      transform: opened ? "translateX(0)" : "translateX(100%)",
    }),
    [opened]
  );

  const handleClick = useCallback((e) => {
    if (e.target.className.includes("dimmer")) {
      dispatch({ type: CLOSE_RIGHT_DRAWER });
    }
  }, []);
  useEffect(() => {
    if (opened) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    }
  }, [opened]);
  return (
    <div ref={closeRef} style={grabbedItemStyle} className='right-drawer'>
      <div className='component-container'>{renderComponent()}</div>

      <style jsx>
        {`
          .component-container {
            width: 100%;
            height: 100%;
            transition: 0.5s ease;
            background-color: darkslategrey;
          }
          .right-drawer {
            height: ${screenHeight + 55}px;
            width: ${screenWidth / 2}px;
            top: 0;
            position: absolute;
            background-color: darkslategrey;
            left: ${screenWidth / 2}px;

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

export default RightDrawer;
