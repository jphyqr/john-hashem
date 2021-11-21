import e from "cors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_BLOCKER,
  SET_DIMMER_BLOCK,
} from "../config/baseReducers/blockedReducer";
import { CLOSE_MODAL } from "../config/baseReducers/modalReducer";
import { useKeyPress } from "../hooks/useKeyPress";
import { CLOSE_FOOTER_DRAWER } from "./FooterDrawer/footerDrawerReducer";
import { CLOSE_HEADER_DRAWER } from "./HeaderDrawer/headerDrawerReducer";
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

  const headerDrawerOpened = useSelector(
    (state) => state.headerDrawer?.opened || false
  );
  const modalOpened = useSelector((state) => state.modal.opened || false);
  const dispatch = useDispatch();
  const handleCloseWindow = () => {
    console.log("HANDLE CLOSE WINDOWS");
    if (rightDrawerOpened) dispatch({ type: CLOSE_RIGHT_DRAWER });

    if (footerDrawerOpened) dispatch({ type: CLOSE_FOOTER_DRAWER });
    if (headerDrawerOpened) dispatch({ type: CLOSE_HEADER_DRAWER });

    if (modalOpened) dispatch({ type: CLOSE_MODAL });
  };

  const show =
    rightDrawerOpened || footerDrawerOpened || modalOpened || headerDrawerOpened
      ? true
      : false;

  useEffect(() => {
    const turnOnBlocker = () => {
      dispatch({ type: SET_DIMMER_BLOCK });
    };
    const clearBlocker = () => {
      dispatch({ type: CLEAR_BLOCKER });
    };

    if (show) turnOnBlocker();
    else clearBlocker();
  }, [show]);

  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    console.log("escape press", escapePress);
    if (escapePress) handleCloseWindow();
  }, [escapePress]);

  return (
    <div onClick={handleCloseWindow} className='dimmer'>
      <div className='close-button' />
      <style jsx>{`
        .close-button {
          position: absolute;
          top: 5px;
          right: 5px;
        }
        .close-button:before {
          content: "X";
          color: red;
          background-color: grey;
          text-align: center;
          line-height: 30px;
          position: absolute;
          top: 5px;
          right: 5px;
          color: black;
          width: 30px;
          height: 30px;
        }
        .dimmer {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;

          width: -webkit-fill-available;
          background-color: black;
          opacity: ${show ? 0.8 : 0};
          z-index: ${show ? 4 : -1};
          transition: 0.2s opacity ease;
        }
      `}</style>
    </div>
  );
};

export default Dimmer;
