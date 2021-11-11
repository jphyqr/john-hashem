import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../config/baseReducers/modalReducer";

const test = () => {
  const modalOpened = useSelector((state) => state.modal.opened);
  const dispatch = useDispatch();
  return (
    <div className='test-container'>
      <div>{modalOpened ? "OPENED" : "CLOSED"}</div>
      <button
        onClick={() =>
          dispatch({ type: OPEN_MODAL, component: () => <div>Modal</div> })
        }
      ></button>
    </div>
  );
};

export default test;
