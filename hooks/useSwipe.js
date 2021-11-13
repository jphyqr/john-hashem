import { useCallback, useRef, useState } from "react";

const useSwipe = (
  onSwipeLeft = function () {
    console.log("onSwipeLeft Not Set");
  },
  onSwipeRight = function () {
    console.log("onSwipeRight Not Set");
  },
  onSwipeDown = function () {
    console.log("onSwipeDown Not Set");
  },
  onSwipeUp = function () {
    console.log("onSwipeUp Not Set");
  },

  onSwipeTLBR = function () {
    console.log("onSwipeUp Not Set");
  },
  onSwipeBRTL = function () {
    console.log("onSwipeUp Not Set");
  },

  onSwipeTRBL = function () {
    console.log("onSwipeUp Not Set");
  },
  onSwipeBLTR = function () {
    console.log("onSwipeUp Not Set");
  },
  onClick = function () {
    console.log("onSwipeUp Not Set");
  },

  { shouldPreventDefault = true, delay = 0 } = {},
  dependencies = []
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const start = useCallback(
    (event) => {
      event.persist();
      console.log("START event", event.type, event.target.id);
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        event.target.addEventListener("mouseup", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }

      if (event.type === "touchstart") {
        setX(null);
        setY(null);
        console.log("useSwipe touchstart", event.touches[0].clientX);
        setX(event.touches[0].clientX);
        setY(event.touches[0].clientY);
      }
      if (event.type === "mousedown") {
        console.log("handle mouse down");
      }

      //   timeout.current = setTimeout(() => {
      //     console.log("LONG PRESS TRIGGERED");
      //     onLongPress(event);
      //     setLongPressTriggered(true);
      //   }, delay);
    },
    [
      onSwipeLeft,
      onSwipeRight,
      onSwipeDown,
      onSwipeUp,
      onSwipeTLBR,
      onSwipeBRTL,
      onSwipeBLTR,
      onSwipeTRBL,
      delay,
      shouldPreventDefault,
      ...dependencies,
    ]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      console.log(
        "clear event type",
        event.type,
        "should trigger click",
        shouldTriggerClick
      );
      event.persist();
      //   timeout.current && clearTimeout(timeout.current);
      //   shouldTriggerClick && !longPressTriggered && onClick();
      //   (shouldTriggerClick || event.type === "mouseup") &&
      //     longPressTriggered &&
      //     onLongPressEnd(event);
      //   setLongPressTriggered(false);

      if (event.type === "touchend") {
        console.log("useSwipe touchend", event.changedTouches[0].target.id);
        if (event.changedTouches[0].target.id == "bottom-left-action") {
          onClick(event);
          return;
        }
        if (
          event.changedTouches[0].clientX < x - 50 &&
          event.changedTouches[0].clientY < y - 50
        ) {
          console.log("HIT SPOT1");
          onSwipeBRTL();
          return;
        }

        if (
          event.changedTouches[0].clientX > x + 50 &&
          event.changedTouches[0].clientY > y + 50
        ) {
          console.log("HIT SPOT2");
          onSwipeTLBR();
          return;
        }

        if (
          event.changedTouches[0].clientX > x + 50 &&
          event.changedTouches[0].clientY < y - 50
        ) {
          console.log("HIT SPOT3");
          onSwipeBLTR();
          return;
        }

        if (
          event.changedTouches[0].clientX < x - 50 &&
          event.changedTouches[0].clientY > y + 50
        ) {
          console.log("HIT SPOT4");
          onSwipeTRBL();
          return;
        }

        if (event.changedTouches[0].clientX < x - 50) {
          onSwipeLeft();
          return;
        }
        if (event.changedTouches[0].clientX > x + 50) {
          onSwipeRight();
          return;
        }

        if (event.changedTouches[0].clientY < y - 50) {
          onSwipeUp(event.changedTouches[0].clientY - y);
          return;
        }

        if (event.changedTouches[0].clientY > y + 50) {
          onSwipeDown();
          return;
        }

        onClick(event.target.id);

        // setX(event.touches[0].clientX);
        // setY(event.touches[0].clientY);
      }
      if (event.type === "mousedown") {
        console.log("handle mouse down");
      }

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
        target.current.removeEventListener("mouseup", preventDefault);
      }
    },
    [
      shouldPreventDefault,
      x,
      y,
      onSwipeUp,
      onSwipeLeft,
      onSwipeDown,
      onSwipeRight,
      onSwipeTLBR,
      onSwipeBRTL,
      onSwipeBLTR,
      onSwipeTRBL,
      x,
    ]
  );

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const isTouchEvent = (event) => {
  return "touches" in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useSwipe;
