import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { useOutsideClick, useScreenWidth } from "../../hooks/outsideClick";
import { CLOSE_HEADER_DRAWER } from "./headerDrawerReducer";

const HeaderDrawer = () => {
  const [screenWidth, screenHeight] = useScreenWidth();
  const closeRef = useRef();
  useOutsideClick(closeRef, () => dispatch({ type: CLOSE_HEADER_DRAWER }));
  const opened = useSelector((state) => state.headerDrawer.opened || false);
  const loading = useSelector((state) => state.headerDrawer.loading || false);
  const component = useSelector(
    (state) => state.headerDrawer.component || null
  );
  const bottom = useSelector(
    (state) => state.headerDrawer.bottom || (screenHeight * 2) / 3
  );
  const dispatch = useDispatch();

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
  const handleTouchStart = useCallback(({ touches }) => {
    const touch = touches[0];

    console.log("handleTouchStart", touch);
    setState((state) => ({
      ...state,
      yStart: touch.clientY,
      dragging: true,
    }));
  }, []);
  const handleTouchMove = useCallback(
    ({ touches }) => {
      const touch = touches[0];

      console.log(
        "state TOUCH MOVE",
        touch.clientY,
        state.yStart,
        screenHeight
      );

      if (
        touch.clientY < screenHeight / 2 &&
        (touch.clientX > screenWidth - 50 || touch.clientX < 50)
      ) {
        dispatch({ type: CLOSE_HEADER_DRAWER });
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
      transform: !opened ? "translateY(0)" : "translateY(100%)",
    }),
    [opened]
  );

  return (
    <div ref={closeRef} style={grabbedItemStyle} className='container'>
      <div className='stacker'>
        {loading && <div className='dimmer' />}
        {loading && <div className='spinner' />}
        <div className='component-container'>{renderComponent()}</div>
      </div>

      <style jsx>
        {`
          .spinner {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 10;
            transform: translateX(-50%);
            width: 48px;
            height: 48px;
            margin-top: 10px;
            margin-bottom: 10px;
          }

          .spinner:after {
            content: " ";
            display: block;
            width: 48px;
            height: 48px;
            margin: -6px;
            border-radius: 50%;
            border: 6px solid black;
            border-color: black transparent black transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }

          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .stacker {
            height: 100%;
            width: 100%;
            position: relative;
          }
          .dimmer {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: black;
            opacity: 0.2;
            z-index: 2;
          }
          .component-container {
            width: 100%;

            transition: 0.5s ease;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .container {
            height: ${bottom - 55}px;

            width: 100%;
            position: absolute;
            background-color: cornsilk;
            bottom: 100%;

            transition: 0.5s ease;
            z-index: 35;
          }
        `}
      </style>
    </div>
  );
};

export default HeaderDrawer;
