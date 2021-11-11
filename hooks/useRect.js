import { useLayoutEffect, useCallback, useState } from "react";

export const useRect = (ref, parent) => {
  const [rect, setRect] = useState(getRect(ref ? ref.current : null));

  const [parentId, setParentId] = useState(
    ref?.current?.offsetParent?.id ? ref?.current?.offsetParent?.id : null
  );

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    // Update client rect
    if (ref.current?.offsetParent?.id) {
      console.log("useRect SET PARENT ID ", ref.current.offsetParent.id);
      setParentId(ref.current.offsetParent.id);
    }

    setRect(getRect(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === "function") {
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      // Browser support, remove freely
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [ref.current]);

  return rect;
};

function getRect(element) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }

  return element.getBoundingClientRect();
}
