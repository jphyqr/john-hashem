import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import {
  containedBottomPxFromYRate,
  containedLeftPxFromXRate,
} from "./dragReducer";
import useLongPress from "../../../hooks/gestureHooks";
import { useScreenWidth } from "../../../hooks/outsideClick";
import { useRect } from "../../../hooks/useRect";

import e from "cors";
import {
  EXIT_COMPLETE_SITE,
  EXIT_DELETE_SITE,
  HOVER_COMPLETE_SITE,
  HOVER_DELETE_SITE,
} from "../../../reducers/dropReducer";
import DeleteDropSite from "../DeleteDropSite";
import { drop } from "lodash";
import { useDoubleTap } from "../../../hooks/useDoubleTap";

const DraggableLabel = ({
  item,
  totalItems,
  key,
  itemHeight,
  itemWidth,

  onDropInGrid,
  onDrop,
  onDragging,

  onItemClick = function () {},
  ...props
}) => {
  const dispatch = useDispatch();

  const deleteSiteHovered = useSelector(
    (state) => state.drop.deleteSiteHovered || false
  );
  const completeSite = useSelector((state) => state.drop.completeSite || {});
  const completeSiteHovered = useSelector(
    (state) => state.drop.completeSiteHovered || false
  );
  const xMetric = useSelector(
    (state) => state.drop.xMetric?.displayName ?? null
  );
  const yMetric = useSelector(
    (state) => state.drop.yMetric?.displayName ?? null
  );

  const vibe = useSelector((state) => state.vibe.vibe);
  const lockY =
    yMetric === "lockY" || yMetric === vibe.compoundMetric ? true : false;
  const lockX = yMetric === vibe.compoundMetric ? true : false;
  const xAxis = useSelector((state) => state.drop.xAxis);
  const {
    onLongPressStart: handleLongPressStart,
    onLongPressEnd: handleLongPressEnd,
  } = props || function () {};

  const lastTouchedId = useSelector(
    (state) => state.vibe.lastTouchedId || null
  );
  const isLastTouchedOfItem = lastTouchedId === item.id ? true : false;
  const selectedIfOfType = useSelector(
    (state) => state[`${item.type}`]?.[`${item.type}`]?.id || null
  );
  const updatedSelf = useSelector((state) => state.drop.updatedOn || null);
  const rate = useSelector((state) => state.rate || null);
  const iAmSelected = selectedIfOfType === item.id ? true : false;
  const grid = useSelector((state) => state.drop || []);
  const [_grid, setGrid] = useState(null);
  const [snapped, setSnapped] = useState(false);
  const deleteSite = useSelector((state) => state.drop.deleteSite || {});

  useEffect(() => {
    console.log("NEW GRID ID!!");
    if (true) {
      setGrid(grid);
      setSnapped(true);
    } else {
      setGrid(null);
      setSnapped(false);
    }
  }, [item.gridId, grid.id, updatedSelf, item.type, xMetric, yMetric]);

  const [_screenWidth, _screenHeight] = useScreenWidth();
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 200,
  };

  const [debug, setDebug] = useState({
    x: null,
    y: null,
  });

  const [_f, f] = useState(0);

  useEffect(() => {
    console.log("UE TEST TRUE");
    f(_f + 1);
  }, [updatedSelf, xMetric, yMetric]);

  useEffect(() => {
    if (!itemRef.current) return;

    const width = itemRef.current.offsetWidth;
    const height = itemRef.current.offsetHeight;

    setState((state) => ({
      ...state,
      width: width,
      height: height,
      isDragged: false,
      x: 0,
      y: 0,
    }));
  }, [itemRef]);

  useEffect(() => {
    if (!_grid) return;

    console.log(
      "Setting X Y UE",
      _grid?.left,
      xMetric,
      yMetric,
      item[`${xMetric}`]
    );
    const containerWidth = _grid.right - _grid.left;
    const containerHeight = _grid.bottom - _grid.top;

    const xIsRated = typeof item[`${xMetric}`] == "number" ? true : false;

    const yIsRated = typeof item[`${yMetric}`] == "number" ? true : false;
    setState((state) => ({
      ...state,
      x: item[`${xMetric}`] ?? 0,
      y: item[`${yMetric}`] ?? 0,
      xIsRated,
      yIsRated,
      left: containedLeftPxFromXRate(
        item[`${xMetric}`] ?? 0.1,
        _grid?.left,
        containerWidth,
        itemWidth
      ),
      top:
        containedBottomPxFromYRate(
          yMetric === "lockY" ? key / totalItems : item[`${yMetric}`] ?? 0.1,
          _grid?.bottom,
          containerHeight,
          itemHeight
        ) - itemHeight,
    }));
  }, [
    _grid?.left,
    _grid?.bottom,
    item.id,
    item[xMetric],
    item[yMetric],
    key,
    totalItems,
    yMetric?.metricId,
    updatedSelf,
  ]);
  const [state, setState] = useState({
    ranked: item[`${xMetric}`] && item[`${yMetric}`] ? true : false,
  });

  const onLongPressStart = useCallback(() => {
    handleLongPressStart(item);
    setState((state) => ({
      ...state,
      isDragged: true,
    }));
  }, [item.id]);

  const onLongPressEnd = useCallback(() => {
    if (lockX && lockY) return;
    console.log("DRAGGABLE LABLE ONLPE");

    if (deleteSiteHovered) {
      deleteSite.onDelete(item);
      return;
    }

    if (completeSiteHovered) {
      completeSite.onComplete(item);
      return;
    }
    if (snapped) handleLongPressEnd(item, _grid.bottom, snapped);
    setState((state) => ({
      ...state,
      isDragged: false,
    }));
    onDrop(
      item,
      {
        x: state.x,
        width: itemWidth,
        y: state.y,

        height: itemHeight,
      },
      totalItems
    );
  }, [
    handleLongPressStart,
    deleteSiteHovered,
    item.id,
    state.x,
    state.y,
    itemWidth,
    itemHeight,
    totalItems,
    _grid?.bottom,
    snapped,
    lockX,
    lockY,
  ]);
  const pressEvent = useLongPress(
    () => onLongPressStart(item, dims),
    () => onLongPressEnd(item),

    useCallback(
      () =>
        onItemClick(
          item,
          snapped ? _grid?.bottom : itemRef.current.offsetTop,
          snapped
        ),
      [_grid?.bottom, itemRef?.current.offsetTop, snapped, onItemClick]
    ),
    defaultOptions
  );

  const itemRef = useRef(null);
  const itemRect = useRect(itemRef);
  const [dims, setDims] = useState({});

  const labelStyle = useMemo(
    () => ({
      position: state.isDragged || snapped ? "absolute" : "static",
      left: state.left,
      top: state.top,
      transition: state.isDragged ? "" : ".2s all ease",

      // border: "3px solid",

      // borderColor: "gold",
      zIndex: isLastTouchedOfItem ? 2 : 1,
    }),
    [
      state.isDragged,

      itemWidth,
      item.newItem,
      itemHeight,
      item.childIndex,
      iAmSelected,
      _grid,
      state.top,
      state.x,
      state.y,
      state.left,
      snapped,
      updatedSelf,
      isLastTouchedOfItem,
    ]
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      let X, Y;

      X = clientX;
      Y = clientY;

      onDragging(item, { x: X, y: Y });
      if (_grid && X < _grid.left + itemWidth / 2) return;
      if (_grid && X > _grid.right - itemWidth / 2) return;
      if (_grid && Y < _grid.top + itemHeight / 2) return;
      // if (state.ranked && Y > rate.bottom - itemHeight / 2) return;

      if (!lockY) {
        setState((state) => ({
          ...state,

          y: Y,

          top: Y - itemHeight / 2,
        }));
      }

      if (!lockX) {
        setState((state) => ({
          ...state,
          x: X,

          left: X - itemWidth / 2,
        }));
      }
    },

    [
      itemWidth,
      item.id,
      itemHeight,
      _grid?.left,
      _grid?.right,
      _grid?.top,
      lockX,
      lockY,
    ]
  );

  const handleItemMove = useCallback(
    ({ touches }) => {
      let X, Y;

      const touch = touches[0];
      X = touch.clientX;
      Y = touch.clientY;

      onDragging(item, { x: X, y: Y });

      if (_grid && X < _grid.left + itemWidth / 2) return;
      if (_grid && X > _grid.right - itemWidth / 2) return;
      if (_grid && Y < _grid.top + itemHeight / 2) return;

      if (
        deleteSite &&
        X > deleteSite.left &&
        X < deleteSite.right &&
        Y > deleteSite.top &&
        Y < deleteSite.bottom
      )
        dispatch({ type: HOVER_DELETE_SITE });
      else {
        dispatch({ type: EXIT_DELETE_SITE });
      }

      if (
        completeSite &&
        X > completeSite.left &&
        X < completeSite.right &&
        Y > completeSite.top &&
        Y < completeSite.bottom
      )
        dispatch({ type: HOVER_COMPLETE_SITE });
      else {
        dispatch({ type: EXIT_COMPLETE_SITE });
      }

      // if (state.ranked && Y > rate.bottom - itemHeight / 2) return;

      if (!lockY) {
        setState((state) => ({
          ...state,

          y: Y,

          top: Y - itemHeight / 2,
        }));
      }

      if (!lockX) {
        setState((state) => ({
          ...state,
          x: X,

          left: X - itemWidth / 2,
        }));
      }
    },
    [
      itemWidth,
      item.id,
      itemHeight,
      _grid?.left,
      _grid?.right,
      _grid?.top,
      lockY,
      lockX,
    ]
  );

  const handleItemGrab = useCallback(({ touches }) => {
    const touch = touches[0];
    console.log("hanndleItemGrab", touch);
    setState((state) => ({
      ...state,
      isDragged: true,
    }));
  }, []);

  const handleItemDrop = useCallback(
    ({ changedTouches }) => {
      const touch = changedTouches[0];
      var Y = touch.clientY;
      var X = touch.clientX;
      if (Y > rate.bottom + itemHeight / 2) {
        console.log("ON DROP NOT RATED", item.id, rate.bottom, itemHeight);
        setState((state) => ({
          ...state,
          x: state.initialX,
          y: state.initialY,
          ranked: false,
          isDragged: false,
        }));
        onDropInGrid(item, { xRate: null, yRate: null }, totalItems);
      } else {
        console.log("ON DROP RATED", item.id, rate.bottom, itemHeight);

        setState((state) => ({
          ...state,
          isDragged: false,
          ranked: true,
          x: X - itemWidth / 2,
          y: Y - itemHeight / 2,
        }));

        onDropInGrid(
          item,
          {
            xRate: Math.max(
              0,
              Math.min(
                1,
                (X - rate.left - itemWidth / 2) /
                  (rate.right - rate.left - itemWidth)
              )
            ),

            yRate: Math.max(
              0,
              Math.min(
                1,
                1 -
                  (Y - itemHeight / 2 - rate.top) /
                    (rate.bottom - rate.top - itemHeight)
              )
            ),
          },
          totalItems
        );
        console.log("ON DROP RATED");
      }
    },
    [rate.bottom, rate.left, rate.right, item.id, itemWidth, itemHeight]
  );

  useEffect(() => {
    if (state.isDragged) {
      window.addEventListener("touchmove", handleItemMove);
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("touchmove", handleItemMove);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [state.isDragged, handleItemMove, handleMouseMove]);
  return (
    <div
      style={labelStyle}
      ref={itemRef}
      {...pressEvent}
      className={`draggable-label ${lockY ? "lock-y" : ""} ${
        !state.xIsRated && !state.yIsRated && !lockY
          ? "float"
          : !state.xIsRated
          ? "x-missing"
          : !state.yIsRated && !lockY
          ? "y-missing"
          : ""
      }`}
    >
      {item.Name}
      <div className='overlay' />
      <style jsx>{`
        .draggable-label {
          background-color: ${item.completed ? "red" : "white"};
          margin-right: 10px;
          height: ${itemHeight}px;
          width: ${itemWidth}px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 10px;
          z-index: 10;
        }
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: ${item[`${vibe?.compoundMetric}`]};
          -webkit-box-shadow: 1px 0px 30px
            ${item[`${vibe?.compoundMetric}`] * 20}px yellow;
          box-shadow: 1px 0px 30px ${item[`${vibe?.compoundMetric}`] * 20}px
            yellow;
          left: 0;
          z-index: -1;
          top: 0;
        }

        .x-missing {
          border-left: 5px solid pink;
          border-right: 5px solid pink;
        }

        .x-missing:before {
          content: "⬅";
          position: absolute;
          left: -20px;
          animation: left-fade 4s infinite;
        }
        .x-missing:after {
          content: "➡";
          position: absolute;
          right: -20px;
          animation: right-fade 4s infinite;
        }
        .y-missing {
          border-top: 5px solid pink;
          border-bottom: 5px solid pink;
        }

        .y-missing:before {
          content: "⬆";
          position: absolute;
          top: -20px;
          animation: top-fade 4s infinite;
        }
        .y-missing:after {
          content: "⬇";
          position: absolute;
          bottom: -20px;
          animation: bottom-fade 4s infinite;
        }
        .overlay:before {
          content: "${typeof item[`${vibe.compoundMetric}`] == "number"
            ? item[`${vibe.compoundMetric}`]?.toFixed(2)
            : ""}";
        }
        .float {
          background-color: pink;
          animation: floating 10s infinite;
        }
        .float:nth-child(odd) {
          animation-delay: 0.5s;
        }

        .float:nth-child(even) {
          animation: floating-2 10s infinite;
        }

        @keyframes floating {
          0%,
          100% {
            transform: translate(-10px, -10px);
          }
          50% {
            transform: translate(10px, 10px);
          }
        }

        @keyframes floating-2 {
          0%,
          100% {
            transform: translate(10px, 10px);
          }
          50% {
            transform: translate(-10px, -10px);
          }
        }

        @keyframes left-fade {
          0%: {
            opacity: 0.8;
            transform: translateX(0px);
          }
          100% {
            opacity: 0;
            transform: translateX(-10px);
          }
        }
        @keyframes right-fade {
          0%: {
            opacity: 0.8;
            transform: translateX(0px);
          }
          100% {
            opacity: 0;
            transform: translateX(10px);
          }
        }

        @keyframes top-fade {
          0%: {
            opacity: 0.8;
            transform: translateY(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        @keyframes bottom-fade {
          0%: {
            opacity: 0.8;
            transform: translateX(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default DraggableLabel;
