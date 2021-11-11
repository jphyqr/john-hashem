import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import { CLEAR_BLOCKER } from "../config/baseReducers/blockedReducer";

const { useEffect, useState } = require("react");

const useOutsideClick = (node, onOutsideClick, isolatedNode, bypassBlock) => {
  const dispatch = useDispatch();
  const disabled = bypassBlock
    ? false
    : useSelector((state) => state.blocked || false);
  useEffect(() => {
    console.log("DISABLED CHANGED");
  }, [disabled]);

  const handleClick = (e) => {
    if (disabled) return;

    if (node.current?.contains(e.target)) {
      console.log("inside click", node.current);
      return;
    }

    if (!_.isEmpty(isolatedNode)) {
      console.log("We have an isolated check", isolatedNode);
      if (_.isEqual(node.current?.className, isolatedNode)) {
        console.log(
          "isolated for node",
          node.current?.className,
          isolatedNode,
          "close node"
        );
        onOutsideClick();
        dispatch({ type: CLEAR_BLOCKER });
      }
    } else {
      onOutsideClick();
    }
  };

  useEffect(() => {
    // add whn mounted
    !disabled && document.addEventListener("mousedown", handleClick);
    !disabled && document.addEventListener("touchstart", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [node, disabled]);

  return;
};

const useScreenWidth = () => {
  if (typeof window !== "undefined") {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const updateWidthAndHeight = () => {
      setWidth(window?.innerWidth);
      setHeight(window?.innerHeight);
    };

    useEffect(() => {
      setWidth(window?.innerWidth);
      setHeight(window?.innerHeight);
    }, []);

    useEffect(() => {
      window.addEventListener("resize", updateWidthAndHeight);
      return () => window.removeEventListener("resize", updateWidthAndHeight);
    }, [width]);

    return [width, height];
  }
  return [300, 600];
};

export { useOutsideClick, useScreenWidth };
