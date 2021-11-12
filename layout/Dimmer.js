import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../config/baseReducers/modalReducer";
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
  const modalOpened = useSelector((state) => state.modal.opened || false);
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    console.log("HANDLE CLOSE WINDOWS");
    if (rightDrawerOpened) dispatch({ type: CLOSE_RIGHT_DRAWER });

    if (footerDrawerOpened) dispatch({ type: CLOSE_FOOTER_DRAWER });

    if (modalOpened) dispatch({ type: CLOSE_MODAL });
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

          width: -webkit-fill-available;
          background-color: black;
          opacity: ${rightDrawerOpened || footerDrawerOpened || modalOpened
            ? 0.8
            : 0};
          z-index: ${rightDrawerOpened || footerDrawerOpened || modalOpened
            ? 4
            : -1};
          transition: 0.2s all ease;
        }
      `}</style>
    </div>
  );
};

export default Dimmer;
