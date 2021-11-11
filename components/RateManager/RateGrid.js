import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecord } from "../../firebase/firebaseActions";
import { useScreenWidth } from "../../hooks/outsideClick";
import { useRect } from "../../hooks/useRect";
import useSwipe from "../../hooks/useSwipe";
import { UPDATE_DROP_SITE } from "../../reducers/dropReducer";
import { CLOSE_MODAL, OPEN_MODAL } from "../../reducers/modalReducer";
import { UPDATE_VIBE } from "../../reducers/vibeReducer";
import DisplayNameForm from "../ModalBodies/DisplayNameForm";

const RateGrid = ({
  gutter,
  onSettingsClick,
  onDropInGrid,
  onRemoveFromGrid,
  onDragOverGrid,
  dropSite = {},
  properties,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  onSwipeUp,
  onSwipeBRTL,
  onSwipeTLBR,
  onSwipeBLTR,
  onSwipeTRBL,
  swipeItems,
  gridId,
  snapPoints,
  colors,
  sourceTypes,
  drawer,
  itemWidth,
  itemHeight,
  onCloseParent,
}) => {
  const {
    topRightLabel,
    topLeftLabel,
    bottomLeftLabel,
    bottomRightLabel,
    type,
  } = properties || {};
  const metrics = useSelector((state) => state.drop?.metrics || []);
  const xMetric = useSelector(
    (state) => state.drop?.xMetric?.displayName || "No Name"
  );
  const yMetric = useSelector(
    (state) => state.drop?.yMetric?.displayName || "No Name"
  );
  const vibe = useSelector((state) => state.vibe.vibe);
  const parentIsOpened = useSelector((state) => state[`${drawer}`]?.opened);
  const xAxis = useSelector((state) => state.drop.xAxis || true);
  useEffect(() => {
    if (parentIsOpened === false) {
      console.log("PARENT DRAWER CLOSED", parentIsOpened);
      onCloseParent();
    }
  }, [parentIsOpened]);
  const [screenWidth, screenHeight] = useScreenWidth();
  const [_sideLength, setSideLength] = useState(0);
  useEffect(() => {
    setSideLength(screenWidth - 2 * gutter);
  }, [screenWidth, gutter]);

  const [f, u] = useState(0);

  const xColor = useSelector((state) => state.drop?.xMetric?.color || "white");
  const xPolar = useSelector((state) => state.drop?.xMetric?.polar || false);
  const xPositive = useSelector(
    (state) => state.drop?.xMetric?.positive || false
  );
  const yPositive = useSelector(
    (state) => state.drop?.yMetric?.positive || false
  );
  const yColor = useSelector((state) => state.drop?.yMetric?.color || "white");
  useEffect(() => {
    u(f + 1);
  }, [type, xMetric?.displayName, yMetric?.displayName, xColor, yColor]);
  const gridSideLength = screenWidth - 2 * gutter;

  const bucketRef = useRef(null);
  const [bucketRect] = useRect(bucketRef);

  const handleUpdateAction = (area) => {
    dispatch({
      type: OPEN_MODAL,
      modalProps: {
        singleTextInput: true,
      },
      component: () => (
        <DisplayNameForm
          onSubmitButtonText={`Set ${area}`}
          onSubmit={async (action) => {
            await updateRecord("vibe_of_user", vibe.id, area, action);

            dispatch({
              type: UPDATE_VIBE,
              key: area,
              value: action,
            });
            dispatch({
              type: CLOSE_MODAL,
            });
          }}
        />
      ),
    });
  };

  const dispatch = useDispatch();

  const swipeEvents = useSwipe(
    onSwipeLeft,
    onSwipeRight,
    onSwipeDown,
    onSwipeUp,
    onSwipeTLBR,
    onSwipeBRTL,
    onSwipeTRBL,
    onSwipeBLTR,
    onSettingsClick
  );
  useEffect(() => {
    const initializeLayout = async () => {
      console.log("INITIALIZE LAYOUT", bucketRect);
      dispatch({
        type: UPDATE_DROP_SITE,
        item: {
          id: gridId,
          left: bucketRect.left,
          right: bucketRect.right,
          top: bucketRect.top,
          bottom: bucketRect.bottom,
          onDrop: onDropInGrid,
          onRemove: onRemoveFromGrid,
          onHover: onDragOverGrid,
          snapPoints: snapPoints,
          itemWidth: itemWidth,
          itemHeight: itemHeight,
        },
      });
    };

    console.log("UE CHECK INITALIZE LAYOUT", bucketRect);
    if (!bucketRect) return;

    initializeLayout();
  }, [
    bucketRect.top,
    bucketRect.left,
    bucketRect.right,
    bucketRect.bottom,
    screenWidth,
  ]);

  return (
    <div
      {...swipeEvents}
      ref={bucketRef}
      className='rate-grid'
      onClick={(e) => console.log("on click", e.target.value)}
    >
      <div className='gradient-x' />
      <div className='gradient-y' />
      <div
        onClick={() => handleUpdateAction("topLeft")}
        className='action-square top-left'
      >
        {topLeftLabel || "Set"}
      </div>
      <div
        onClick={() => handleUpdateAction("topRight")}
        className='action-square top-right'
      >
        {topRightLabel || "Set"}
      </div>
      <div
        onClick={() => handleUpdateAction("bottomLeft")}
        className='action-square bottom-left'
        id='bottom-left-action'
      >
        {bottomLeftLabel || "Set"}
      </div>
      <div
        onClick={() => onSettingsClick("bottomRight")}
        className='action-square bottom-right'
      >
        {bottomRightLabel || "Set"}
      </div>
      {/* <div className='border-label bottom-left-side'>not {yMetric}</div>
      <div className='border-label  bottom-left-bottom'>not {xMetric}</div> */}
      {/* <div className='left-border-label top-left-side'>{yMetric}</div> */}
      {/* <div className='border-label  top-left-top'>not {xMetric}</div> */}
      <div className='right-border-label' />
      <div className='top-border-label' />

      {snapPoints.map((snap, i) => {
        return (
          <div
            key={i}
            style={{
              left: itemWidth / 2 + (snap / 10) * (_sideLength - itemWidth),
            }}
            className='vertical-line'
          />
        );
      })}

      {snapPoints.map((snap, i) => {
        return (
          <div
            key={i}
            style={{
              bottom: itemHeight / 2 + (snap / 10) * (_sideLength - itemHeight),
            }}
            className='horizontal-line'
          />
        );
      })}

      {/* <div className='border-label  bottom-right-side'>not {yMetric}</div> */}
      {/* <div className='bottom-border-label bottom-right-bottom'>{xMetric}</div> */}
      {/* <div
        // onClick={onSettingsClick}
        id={"settings-button"}
        className='settings-button'
      >
        ⚙️
      </div> */}
      {/* <div className='filter-item-indicator'>
        {sourceTypes.map((item, i) => {
          return (
            <div
              key={i}
              className={`swipe-indicator ${
                type === item.type ? "selected" : "not-selected"
              }`}
            ></div>
          );
        })}
      </div> */}

      {/* <div className='x-item-idicator'>
        {metrics?.map((item, i) => {
          return (
            <div
              key={i}
              className={`swipe-indicator ${
                xMetric === item
                  ? "selected"
                  : yMetric === item
                  ? "blocked"
                  : "not-selected"
              }`}
            ></div>
          );
        })}
      </div> */}

      {/* <div className='y-item-indicator'>
        {metrics?.map((item, i) => {
          return (
            <div
              key={i}
              className={`swipe-indicator-vertical ${
                yMetric === item
                  ? "selected"
                  : xMetric === item
                  ? "blocked"
                  : "not-selected"
              }`}
            ></div>
          );
        })}
      </div> */}
      {/* <div className='gradient-total' /> */}
      <style jsx>{`

.settings-button{
  position:absolute;
  left:10px;
  top: -30px;
  background-color: lightgrey;
  border-radius: 2px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 12px;
}
      .swipe-indicator, .swipe-indicator-vertical{
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: grey;
        opacity: 0.3;
      }
      .swipe-indicator{
       
        margin-right: 10px;
       
      }
      .selected{
        opacity: 0.7;
      }
      .swipe-indicator:last-child{
        margin-right: 0px;
      }

      .swipe-indicator-vertical{
margin-bottom: 10px;
      }

      .blocked{
        opacity: 0.1;
      }
.x-item-idicator {
  display: flex;

  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  
}
.y-item-indicator{
  display:flex;
  flex-direction: column;
  right: -15px;
  position:absolute;
  top:50%;
  transform: translateY(-50%);
}

.filter-item-indicator{
  display:flex;
  right: 0px;
  position:absolute;
  top:-30px;
}
      .action-square {
          position:absolute;
         width: ${_sideLength / 2}px;
        height: ${_sideLength / 2}px;
      
          display: ${yMetric === vibe?.compoundMetric ? "flex" : "none"};
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          opacity: 0.4;
        
          border: 1px solid black;

      }
      .top-left{
          top:0;
          left:0;
          align-items:flex-start;
          justify-content: flex-start;
         
        
      }
      .top-right{
          top:0;
          right:0;
          align-items:flex-end;
          justify-content: flex-start;
      }
      .bottom-left{
          bottom:0;
          left:0;
          align-items:flex-start;
          justify-content: flex-end;
      }
      .bottom-right{
          bottom:0;
          right:0;
          align-items:flex-end;
          justify-content: flex-end;
      }
      .gradient-x, .gradient-y , .gradient-total{
          opacity 0.5;
          width: ${_sideLength}px;
       
          height: ${_sideLength}px;
          position: absolute;
          left: 0;
          top: 0;
      }
.top-border-label {
font-size: 11px;

position: absolute;


height: ${gutter}px;
right:5px;
width: ${_sideLength}px;
color: white;
bottom:0;
left: 0;
text-align:right;
transform: translateY(100%);
opacity: 0.5;
background: ${
        xPolar
          ? `linear-gradient(90deg, red 0%, white 50%, ${xColor} 100%)`
          : `linear-gradient(90deg, white 20%, ${xColor} 100%)`
      } ;
}

.top-border-label:before{
  position: absolute;
  top:0;
  width: 200%;
  background-color: aliceblue;
  content: "";
  left: 0;
  height: 200%;
  border-radius: 100%;
  transform:  translateX(-50%) translateY(0%);
  z-index:1;

  
  
}

.top-border-label:after{
  content: "${xPositive ? "" : "-"}${xMetric}";
  position:absolute;
   color: black;
  left: 30%;
  z-index: 10;
  bottom: 0;
  font-size: 13px;
  
}



.right-border-label {
  background: linear-gradient(0deg, white 33%, ${yColor} 100%);
opacity: 0.5;
 background-color: purple;
 position:absolute;
 left: 0;
 top: 0;
 width: ${gutter}px;
 transform: translateX(-100%);
 height: ${_sideLength}px;
}

.right-border-label:before{
  position: absolute;
  top:0;
  right: 0;
  width: 200%;
  background-color: aliceblue;
  content: "";
  left: 0;
  height: 200%;
  border-radius: 100%;
  transform:  translateX(-50%) translateY(-10px);
  z-index:2;
  
  
}

.right-border-label:after{
  content: "${yPositive ? "" : "-"} ${yMetric}";
  position:absolute;
  left: 0px;
  top: 40%;
  font-size: 13px;
  color: black;
  height: 13px;
  transform: rotateZ(-90deg) translateX(-50%) translateY(-50%);
  z-index: 2;
}


.bottom-left-side, .top-left-side{


}
.bottom-left-side{
    transform: rotate(-90deg) translateX(55px) translateY(-60px);
}
.top-left-side{
    transform: rotate(-90deg) translateX(-55px) translateY(-60px);
    text-align: right;
}
.top-left-top{
   
    transform: translateY(-15px) translateX(5px);
}

.top-right-top{
    right: 0;
    text-align:right;
    transform: translateY(-15px) translateX(-5px);
}
.top-right-side{
    right: 0;
    transform: rotate(90deg) translateX(5px) translateY(-60px);
    text-align: right; 
}


.bottom-right-side{
    right:0;

    transform rotate(90deg) translateY(-60px) translateX(-55px);
    text-align: right;
}

.bottom-left-bottom, .bottom-right-bottom, .bottom-left-side, .bottom-right-side{
    bottom: 0;
}
.bottom-right-bottom{
    bottom: -15px;
    right: 5px;
    text-align: right;


}

.bottom-left-bottom{
    bottom:-15px;
    left: 5px;
}



    .y-label-min{
       
       

        left: ${_sideLength}px;
        bottom: 50px;
    }
 
      .gradient-x{
        background: ${
          xPolar
            ? `linear-gradient(90deg, red 0%, white 50%, ${xColor} 100%)`
            : `linear-gradient(90deg, white 20%, ${xColor} 100%)`
        } ;
  }
  
      }
      .gradient-y{
        background: linear-gradient(0deg, white 20%, ${yColor} 80%); 
     
      }
      


      .vertical-line, .horizontal-line{
        background-color: blue;
        opacity: 0.3;
        position: absolute;
        display: ${yMetric === vibe?.compoundMetric ? "none" : "flex"};
      }
.vertical-line{
  height: 100%;
  width: 1px;
  opacity: ${xMetric === vibe?.primaryMetric ? 0.1 : 0.3};
   
  
}

.horizontal-line{
  height: 1px;
  width: 100%;

  opacity: ${xMetric === vibe?.primaryMetric ? 0.6 : 0.3};
   
}

.y-zero{
  left: ${itemWidth / 2}px;
  
}

        .rate-grid {
          width: ${gridSideLength}px;
          height: ${gridSideLength}px;
          position: relative;
          display: inline-block;
         
          
        }
      `}</style>
    </div>
  );
};
export default RateGrid;
