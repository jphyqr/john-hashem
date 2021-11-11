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

  useEffect(() => {
    const disableOutsideClicks = () => {
      dispatch({ type: DISABLE_OUTSIDE_CLICK });
    };
    const enableOutsideClicks = () => {
      dispatch({ type: CLEAR_BLOCKER });
    };
    console.log("OPENED CHANGED");
    if (opened) disableOutsideClicks();
    else enableOutsideClicks();
  }, [opened]);

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
      <div
        onClick={() => {
          // onClose();
          dispatch({ type: CLOSE_MODAL });
          dispatch({ type: CLEAR_BLOCKER });

          //  onClose && onClose();
        }}
        className={"dimmer"}
      />

      <div className='content' ref={node}>
        {renderModal()}
      </div>

      <style jsx>{`
        .dimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: ${screenHeight}px;
          background-color: black;
          z-index: ${opened ? 100 : -1};
          opacity: ${opened ? 0.8 : 0};
          transition: 0.5s all ease;
        }
        .modal-wrapper-container {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: ${opened ? 100 : -1};
          opacity: ${opened ? 1 : 0};
          height: 100%;

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

        .content {
          width: 100%;
          display: flex;
          flex-direction: column;
          aign-items: center;
          background-color: white;
          height: ${singleTextInput ? "25" : "75"}%;
          width: 90%;
          justify-content: center;
          transition: 0.4s linear;
          z-index: ${opened ? 100 : -1};
          opacity: ${opened ? 1 : 0};
          margin-top: ${singleTextInput ? 30 : 0}px;
          transition: 0.5s all ease;
          overflow-y: scroll;
        }

        @keyframes push-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200px);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalWrapper;
