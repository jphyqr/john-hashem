import { useEffect, useRef, useState } from "react";
import { useScreenWidth } from "../../hooks/outsideClick";
import { useRect } from "../../hooks/useRect";
import useSwipe from "../../hooks/useSwipe";

const ExportedGrid = ({
  userUid,
  vibeId,
  itemColor = "aliceblue",
  itemHeight = 20,
  itemWidth = 50,
}) => {
  const [state, setState] = useState({
    gridLoading: false,
  });
  const gridRef = useRef();
  const gridRect = useRect(gridRef);
  const onSwipeBRTL = () => {
    setState((state) => ({
      ...state,
      xMetric: state.yMetric,
      yMetric: state.xMetric,
    }));
  };
  const onSwipeTLBR = () => {
    setState((state) => ({
      ...state,
      xMetric: state.yMetric,
      yMetric: state.xMetric,
    }));
  };

  const CYCLE_METRIC = (oldMetric, xMetric = true, next = true) => {
    if (state?.metrics?.length < 3) return;

    let originalMetrics = [...state.metrics];

    let currentArray = [...state.metrics];
    var currentIndex = currentArray.findIndex(
      (e) => e.metricId === oldMetric.metricId
    );

    let prefix = currentArray.splice(0, currentIndex);
    currentArray = currentArray.concat(prefix);
    let possibleMetrics = Object.keys(state)?.filter((pk) =>
      pk.includes("Metric")
    );

    for (const metric of possibleMetrics) {
      currentArray = currentArray.filter(
        (i) => i?.displayName !== state?.[`${metric}`]?.displayName
      );
    }

    let nextItem;
    if (currentArray.length < 1) return uDrop;
    if (next) {
      nextItem = currentArray.shift();
    } else {
      nextItem = currentArray.pop();
    }

    if (xMetric) {
      setState((state) => ({ ...state, xMetric: nextItem }));
    } else {
      setState((state) => ({ ...state, yMetric: nextItem }));
    }

    setState((state) => ({ ...state, metrics: originalMetrics }));
  };

  const onSwipeLeft = () => CYCLE_METRIC(state?.xMetric, true, true);
  const onSwipeRight = () => CYCLE_METRIC(state?.xMetric, true, false);
  const onSwipeUp = () => CYCLE_METRIC(state?.yMetric, false, true);
  const onSwipeDown = () => CYCLE_METRIC(state?.yMetric, false, false);

  const swipeEvents = useSwipe(
    onSwipeLeft,
    onSwipeRight,
    onSwipeDown,
    onSwipeUp,
    onSwipeTLBR,
    onSwipeBRTL
  );
  useEffect(() => {
    if (!gridRef?.current) return;

    setState((state) => ({
      ...state,
      sideLength: Math.min(
        gridRef.current.parentElement.offsetHeight,
        gridRef.current.parentElement.offsetWidth
      ),
    }));
  }, [gridRef?.current]);
  useEffect(() => {
    const getItemsAndMetricsForVibeAndUser = async () => {
      try {
        setState((state) => ({
          ...state,
          gridLoading: true,
          gridError: false,
          gridSuccess: false,
        }));
        const data = {
          userUid: userUid,
          vibeId: vibeId,
        };
        let response = await fetch(
          "https://us-central1-layerate.cloudfunctions.net/getExportedGridData",
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          }
        );
        let json = await response.json();

        console.log("getItemsAndMetricsForVibe", json);
        setState((state) => ({
          ...state,
          gridLoading: false,
          gridSuccess: true,
          vibe: json.vibe,
          items: json.items,
          metrics: json.vibe.metrics,
          xMetric: json.vibe.metrics[0],
          yMetric: json.vibe.metrics[1],
        }));
      } catch (error) {
        setState((state) => ({
          ...state,
          gridLoading: false,
          gridError: true,
        }));
        console.log("error getting items and metrics for vibe", error);
      }
    };

    if (!userUid || !vibeId) return;

    getItemsAndMetricsForVibeAndUser();
  }, [userUid, vibeId]);
  const gutter = 10;

  const gridSideLength = state?.sideLength - 2 * gutter;
  const xColor = state?.xMetric?.color; //useSelector((state) => state.drop?.xMetric?.color || "white");
  const yColor = state?.yMetric?.color; //useSelector((state) => state.drop?.yMetric?.color || "white");

  const containedLeftPxFromXRate = (
    xRate,

    containerWidth,
    itemWidth
  ) => {
    let containedArea = containerWidth - itemWidth;
    let pxFromContainerEdge = xRate * containedArea;
    return pxFromContainerEdge;
  };

  const containedBottomPxFromYRate = (
    yRate,

    containerHeight,
    itemHeight
  ) => {
    let containedArea = containerHeight - itemHeight - gutter;

    let pxFromContainerEdge = yRate * containedArea;
    return pxFromContainerEdge;
  };
  const initialState = {
    item: {},
  };

  if (!state || state?.gridLoading) return <div>Grid Loading...</div>;
  if (state?.gridError) return <div>Grid Error</div>;

  const containerWidth = gridRect.right - gridRect.left;
  const containerHeight = gridRect.bottom - gridRect.top;
  console.log(
    "container width",
    containerWidth,
    "container hieght",
    containerHeight
  );
  return (
    <div ref={gridRef} {...swipeEvents} className='exported-grid-container'>
      <div className='gradient-x' />
      <div className='gradient-y' />
      <div className='right-border-label' />
      <div className='top-border-label' />

      {state?.items?.map((item, i) => {
        return (
          <label
            style={{
              left: containedLeftPxFromXRate(
                item[`${state?.xMetric?.displayName}`] ?? 0.1,

                containerWidth,
                itemWidth
              ),
              top: containedBottomPxFromYRate(
                1 - item[`${state?.yMetric?.displayName}`] ?? 0.1,
                containerHeight,
                itemHeight
              ),
            }}
            item={item}
            totalItems={state?.items?.length ?? 0}
            key={i}
          >
            {item.Name}{" "}
          </label>
        );
      })}

      <style jsx>{`


.gradient-x, .gradient-y, .gradient-total{
  opacity 0.5;
  width: ${gridSideLength}px;

  height: ${gridSideLength}px;
  position: absolute;
  left: 0;
  top: 0;
}


        label {
          position: absolute;
          background-color: ${itemColor};
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

        .exported-grid-container {
          margin-left: ${gutter}px;
          width: ${gridSideLength}px;
          min-height: ${gridSideLength}px;
          position: relative;
          display: table-cell;
        }


     

      .gradient-x{
          background: linear-gradient(90deg, white 20%, ${xColor} 100%);
    }
    
        
        .gradient-y{
          background: linear-gradient(0deg, white 20%, ${yColor} 80%); 
       
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
         height: ${gridSideLength}px;
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
          content: "${state?.yMetric?.displayName || "no name"}";
          position:absolute;
          left: 0px;
          top: 40%;
          font-size: 13px;
          color: black;
          height: 13px;
          transform: rotateZ(-90deg) translateX(-50%) translateY(-50%);
          z-index: 2;

            }








            .top-border-label {
              font-size: 11px;
              
              position: absolute;
              
              
              height: ${gutter}px;
              right:5px;
              width: ${gridSideLength}px;
              color: white;
              bottom:0px;
              left: 0;
              text-align:right;
           
              opacity: 0.5;
              background: linear-gradient(90deg, white 20%, ${xColor} 100%) ;
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
                content: "${state?.xMetric?.displayName || "no name"}";
                position:absolute;
                 color: black;
                left: 30%;
                z-index: 10;
                bottom: 0;
                font-size: 13px;
                
              }





      `}</style>
    </div>
  );
};

export default ExportedGrid;
