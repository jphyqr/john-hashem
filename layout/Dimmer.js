import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_FOOTER_DRAWER } from "./FooterDrawer/footerDrawerReducer";
import {
  CLOSE_RIGHT_DRAWER,
  rightDrawerReducer,
} from "./RightDrawer/rightDrawerReducer";

const Dimmer = () => {
  const rightDrawerOpened = useSelector(
    (state) => state.rightDrawer?.opened || false
  );
  const footerDrawerOpened = useSelector(
    (state) => state.footerDrawer?.opened || false
  );
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    console.log("HANDLE CLOSE WINDOWS");
    if (rightDrawerOpened) dispatch({ type: CLOSE_RIGHT_DRAWER });

    if (footerDrawerOpened) dispatch({ type: CLOSE_FOOTER_DRAWER });
  };
  return (
    <div onClick={handleCloseWindow} className='dimmer'>
      <style jsx>{`
        .dimmer {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: black;
          opacity: ${rightDrawerOpened || footerDrawerOpened ? 0.6 : 0};
          z-index: ${rightDrawerOpened || footerDrawerOpened ? 4 : -1};
          transition: 0.2s all ease;
        }
      `}</style>
    </div>
  );
};

export default Dimmer;
