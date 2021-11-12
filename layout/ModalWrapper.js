import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_BLOCKER,
  DISABLE_OUTSIDE_CLICK,
} from "../config/baseReducers/blockedReducer";

import { useRect } from "../hooks/useRect";
import { CLOSE_MODAL } from "../config/baseReducers/modalReducer";
import { useScreenWidth } from "../hooks/outsideClick";

const ModalWrapper = () => {
  const node = useRef(null);
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.modal.opened);
  const onClose = useSelector((state) => state.modal.onClose || function () {});
  const modalComponent = useSelector((state) => state.modal.component);
  const modalProps = useSelector((state) => state.modal.modalProps || {});
  const { singleTextInput } = modalProps || false;

  const [, screenHeight] = useScreenWidth();
  const renderModal = () => {
    let ShowComponent;

    //  if (!_.isEmpty(modalComponent)) {
    if (modalComponent) {
      ShowComponent = modalComponent;
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

  // const [_isolated, setIsolated] = useState(false);

  // useEffect(() => {
  //   const isolateNode = () => {
  //     console.log(node.current.className);
  //     dispatch({
  //       type: ISOLATE_NODE,
  //       node: node.current.className,
  //     });
  //     setIsolated(true);
  //   };

  //   if (!node.current || _isolated) return;

  //   console.log("CLOSE REF IS CURRENT");
  //   return isolateNode();
  // }, [node.current]);

  return (
    <div className='modal-wrapper-container'>
      {renderModal()}

      <style jsx>{`
        .modal-wrapper-container {
          width: 90%;
          background-color: white;
          height: ${singleTextInput ? "25" : "75"}%;
          overflow-y: scroll;
          position: absolute;
          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);
          z-index: ${opened ? 100 : -1};
          opacity: ${opened ? 1 : 0};

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: ${singleTextInput ? "flex-start" : "center"};

          transition: 0.5s all ease;
        }
        @keyframes modalAppear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .exit-relative {
          width: 100%;
          position: relative;
          background-color: red;
          padding: 10px;
        }

        @keyframes push-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200px);
          }
        }

        @media screen and (orientation: landscape) {
          .modal-wrapper-container {
            height: 90%;
            width: 75%;
          }
        }
      `}</style>
    </div>
  );
};

export default ModalWrapper;
