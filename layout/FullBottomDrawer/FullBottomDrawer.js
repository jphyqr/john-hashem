import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useScreenWidth } from "../../hooks/outsideClick";
import { CLOSE_FULL_BOTTOM_DRAWER } from "./fullBottomDrawerReducer";

const FullBottomDrawer = () => {
  const opened = useSelector((state) => state.fullBottomDrawer.opened || false);
  const [screenWidth, screenHeight] = useScreenWidth();
  const blocked = useSelector((state) => state.blocked || false);
  const component = useSelector((state) => state.fullBottomDrawer.component);

  const dispatch = useDispatch();

  useEffect(() => {
    setState((state) => ({ ...state, blocked: blocked }));
  }, [blocked]);
  const renderComponent = () => {
    let ShowComponent;

    if (component) {
      ShowComponent = component;
      return <ShowComponent />;
    }

    return <div></div>;
  };

  const [state, setState] = useState({
    yStart: null,
    dragging: false,
  });
  const handleTouchStart = useCallback(
    ({ touches }) => {
      if (blocked) return;
      const touch = touches[0];

      console.log("handleTouchStart", touch);
      setState((state) => ({
        ...state,
        yStart: touch.clientY,
        dragging: true,
      }));
    },
    [blocked]
  );

  const handleTouchMove = useCallback(
    ({ touches }) => {
      const touch = touches[0];

      console.log(
        "state TOUCH MOVE",
        "isblocked",
        state.blocked,
        touch.clientY,
        state.yStart,
        screenHeight
      );

      if (
        touch.clientY > screenHeight / 2 &&
        (touch.clientX > screenWidth - 50 || touch.clientX < 50)
      ) {
        dispatch({ type: CLOSE_FULL_BOTTOM_DRAWER });
        setState((state) => ({
          ...state,
          dragging: false,
          yStart: null,
        }));
      }
    },
    [screenHeight]
  );

  useEffect(() => {
    if (opened) window.addEventListener("touchstart", handleTouchStart);
    else {
      window.removeEventListener("touchstart", handleTouchStart);
      setState((state) => ({ ...state, dragging: false, yStart: null }));
    }
  }, [opened]);

  useEffect(() => {
    if (opened) {
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      console.log("REMOVE TOUVCH MOVE");
      window.removeEventListener("touchmove", handleTouchMove);
    }
  }, [opened]);

  const grabbedItemStyle = useMemo(
    () => ({
      transform: opened ? "translateY(0)" : "translateY(100%)",
    }),
    [opened]
  );

  return (
    <div className='container' style={grabbedItemStyle}>
      <div className='component-container'>
        {/* <div className={styles.dimmer} /> */}
        {renderComponent()}
      </div>

      <style jsx>
        {`
          .swipe-down {
            position: absolute;
            right: 0;
            bottom: 50px;
            height: ${screenHeight / 2}px;
            background-color: ;
            width: 30px;
            z-index: 30;
          }
          .component-container {
            height: 100%;
            width: 100%;
            position: relative;
          }
          .container {
            height: 100vh;
            width: 100vw;
            background-color: aliceblue;

            position: absolute;
            left: 0;
            top: 0;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            transition: 0.5s all ease;
            z-index: 25;
          }
        `}
      </style>
    </div>
  );
};

export default FullBottomDrawer;
