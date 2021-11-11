import { drop } from "lodash";
import styles from "../../styles/Home.module.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChildrenOfParentRecords,
  getHighestPriorityChild,
  getHighestRatedChildOfParent,
  getPossibleChildrenLinks,
  updateSelf,
  createNewGenericItem,
  updateRecord,
  getDocsOfCollection,
  getDoc,
  updateProfileForSignedInUser,
  setRecord,
  setDoc,
  updateItemForSignedInUser,
} from "../../firebase/firebaseActions";

import TestDrawerItem from "../../layout/FooterDrawer/TestDrawerItem";
import {
  getItemInArrayById,
  getXYRelative,
  removeItemInArray,
  stripArrayOfLinked,
  stripDisplayNamesOffArray,
  stripObjFromLinked,
  updateItemInArray,
  updateItemPropertyInArray,
} from "../../helpers/helperFunctions";
import { useScreenWidth } from "../../hooks/outsideClick";
import {
  CYCLE_METRIC,
  INVERT_METRICS,
  UPDATE_DROP_PROPERTY,
} from "../../reducers/dropReducer";

import {
  CLOSE_FOOTER_DRAWER,
  OPEN_FOOTER_DRAWER,
} from "../../layout/FooterDrawer/footerDrawerReducer";

import {
  CLOSE_HEADER_DRAWER,
  OPEN_HEADER_DRAWER,
} from "../../layout/HeaderDrawer/headerDrawerReducer";

import { RELEASE_ITEM } from "./DraggableLabel/dragReducer";
import RateGrid from "./RateGrid";
import UnratedList from "./UnratedList";
import VerticalSpacer from "../../layout/spacers/VerticalSpacer";
import { CLOSE_MODAL, OPEN_MODAL } from "../../reducers/modalReducer";
import ColorManager from "./ColorManager";
import MetricItem from "../MetricItem";
import { useRect } from "../../hooks/useRect";
import DeleteDropSite from "./DeleteDropSite";
import CompleteDropSite from "./CompleteDropSite";
import { OPEN_RIGHT_DRAWER } from "../../layout/RightDrawer/rightDrawerReducer";
import SettingsMenu from "../../layout/SettingsMenu";
import { LOADING_FINISHED, LOADING_STARTED } from "../../reducers/asyncReducer";
import { getRecordsFromAirtableForView } from "./rateActions";
import Loader from "../../layout/Loader";
import { blockedReducer } from "../../reducers/blockedReducer";
import {
  ADD_METRIC_TO_VIBE,
  SET_ITEMS,
  SET_VIBE,
  TOUCH_ITEM,
  UPDATE_ITEM,
  UPDATE_VIBE,
} from "../../reducers/vibeReducer";
import cuid from "cuid";
import VibeManager from "../VibeManager/VibeManager";
import ObjectiveManager from "../ObjectiveManager/ObjectiveManager";
import ItemRecord from "./ItemRecord";
import ActionButtons from "./ActionButtons";
import { min } from "date-fns";
import { compose } from "redux";
const RateManager = ({
  gutter,
  gridId,
  sourceTypes,
  parentType,
  overRideOnAddClick,
  onSettingsClick,
  onNewItemClick,
  ...props
}) => {
  const dispatch = useDispatch();
  const [screenWidth, screenHeight] = useScreenWidth();
  const dropSite = useSelector((state) => state.drop || {});
  const auth = useSelector((state) => state.firebase.auth || null);
  const itemsUpdated = useSelector((state) => state.drop.itemsUpdated);
  //const drop = getItemInArrayById(dropSites, gridId);
  const [state, setState] = useState({
    x: 0,
    y: 0,
    activeBucket: {},
    isHolding: false,
    grabbedItem: {},
    bucketDimensions: {},
    completedRates: 0,
    totalRates: 0,
    previouslyRated: false,
    showRateAnimation: false,
    showRateButton: false,
  });
  const [_source, setSource] = useState(sourceTypes[0] || {});
  const xLoading = useSelector((state) => state.async.loading || false);
  const xLoadingMessage = useSelector((state) => state.async.message || "");
  const xMetric = useSelector((state) => state.drop?.xMetric || null);
  const yMetric = useSelector((state) => state.drop?.yMetric || null);
  const objectives = useSelector((state) => state.drop.objectives || []);
  const objective = useSelector((state) => state.drop.objective || null);
  const objectiveId = useSelector(
    (state) => state.drop.objective?.objectiveId || null
  );
  const vibe = useSelector((state) => state.vibe.vibe || {});
  const vibes = useSelector((state) => state.vibe.vibes || []);
  const mood = useSelector((state) => state.drop.mood || null);
  const moods = useSelector((state) => state.drop.moods || []);
  const metrics = useSelector((state) => state.drop.metrics || []);
  const items = useSelector((state) => state.vibe.items || []);

  const [_complete, setShowComplete] = useState(false);
  const [_delete, setShowDelete] = useState(false);
  const completeRef = useRef(null);
  const [completeRect] = useRect(completeRef);
  const airtableKey = useSelector((state) => state.drop.airtableKey || null);
  const [_f, f] = useState(0);
  const parent = useSelector(
    (state) => state[`${parentType}`]?.[`${parentType}`] || {}
  );

  const parentUpdated = useSelector(
    (state) => state[`${parentType}`]?.updatedOn || null
  );

  const handleUpdateItemInList = useCallback(
    async (item, metrics) => {
      try {
        let uItem = item;

        dispatch({
          type: UPDATE_ITEM,
          item: uItem,
        });

        await updateItemForSignedInUser(uItem);
      } catch (error) {
        console.log("error updating item in list", error);
      }
    },
    [vibe?.id]
  );

  // const completedRates = items.reduce(
  //   (prev, item) =>
  //     prev +
  //     metrics.reduce(
  //       (p, metric) => (p + item[`${metric.displayName}`] > 0 ? 1 : 0),
  //       0
  //     ),
  //   0
  // );

  // const completedRates = metrics.reduce(
  //   (prev, metric) =>
  //     prev +
  //     items.reduce(
  //       (p, item) => console.log("checking", item, "for", metric.displayName),
  //       0
  //     ),
  //   0
  // );

  useEffect(() => {
    f(_f + 1);
  }, [objectiveId]);

  useEffect(() => {
    if (!metrics.length || !items?.length || !objective?.id) return;

    let completedRates = 0;
    for (const metric of metrics) {
      for (const item of items) {
        if (item[`${metric.displayName}`]) completedRates++;
      }
    }
    const totalRates = metrics.length * items.length;

    const ratesCompleted = completedRates === totalRates ? true : false;

    setState((state) => ({
      ...state,
      totalRates: totalRates,
      completedRates: completedRates,
      previouslyRated: objective.previouslyRated || false,
      showRateButton: ratesCompleted,
      showPlanButton: false,
      showExecuteButton: false,
      showRateAnimation:
        ratesCompleted && !objective.previouslyRated ? true : false,
    }));
  }, [metrics?.length, items?.length, objective?.id]);

  const cycleSource = (next) => {
    var currentIndex = sourceTypes
      .map(function (x) {
        return x.type;
      })
      .indexOf(_source.type);

    if (next) {
      if (currentIndex === sourceTypes.length - 1) {
        setSource(sourceTypes[0]);
      } else {
        setSource(sourceTypes[currentIndex + 1]);
      }
    } else {
      if (currentIndex === 0) {
        setSource(sourceTypes[sourceTypes.length - 1]);
      } else {
        setSource(sourceTypes[currentIndex - 1]);
      }
    }
  };

  // useEffect(() => {
  //   const fetchItemsForSource = async () => {
  //     console.log("fetcinh Items for metrics", metrics);
  //     try {
  //       let items = await getChildrenOfParentRecords(
  //         _source.type,
  //         parentType,
  //         parent.id
  //       );

  //       let strippedItems = stripArrayOfLinked(items, _source.type, [
  //         ...stripDisplayNamesOffArray(metrics),
  //         "gridId",
  //         "newItem",
  //         "totalScore",
  //       ]);
  //       console.log({ strippedItems });
  //       setItems(strippedItems);
  //       f(_f + 1);
  //     } catch (error) {
  //       console.log("error fetching items for source", error);
  //     }
  //   };

  //   if (!_source.type || !parent.id || !parentType) return;

  //   fetchItemsForSource();
  // }, [
  //   parentUpdated,
  //   _source.type,
  //   parentType,
  //   parent.id,

  //   _source?.xMetric,
  //   _source?.yMetric,
  //   gridId,
  //   metrics.length,
  // ]);

  useEffect(() => {
    const getItemsForVibe = async () => {
      try {
        dispatch({
          type: LOADING_STARTED,
          message: "Getting items for vibe",
        });
        // let items = await getRecordsFromAirtableForView(
        //   airtableKey,
        //   objective.base,
        //   objective.table,
        //   objective.view
        // );
        //todo PUMP these records to firestore items_of_user

        let items = await getDocsOfCollection("item_of_user", [
          "vibeId",
          "==",
          vibe.vibeId,
        ]);

        dispatch({ type: SET_ITEMS, items: items });
        dispatch({ type: LOADING_FINISHED });
      } catch (error) {
        dispatch({ type: LOADING_FINISHED });
        console.log("error getting items for objective", error);
      }
    };

    if (!auth?.uid) return;
    if (!vibe?.vibeId) return;

    getItemsForVibe();
  }, [vibe?.vibeId, auth?.uid]);

  return (
    <div className='rate-manager'>
      {xLoading && xLoadingMessage && (
        <div className={styles.globalLoader}>
          <Loader message={xLoadingMessage} />
        </div>
      )}

      <VerticalSpacer height='30' />
      <ActionButtons />
      <VerticalSpacer height='10' />
      <RateGrid
        {...props}
        properties={{
          topRightLabel: vibe.topRight,
          topLeftLabel: vibe.topLeft,
          bottomLeftLabel: vibe.bottomLeft,
          bottomRightLabel: vibe.bottomRight,
        }}
        gridId={"RateGrid"}
        dropSite={drop}
        sourceTypes={sourceTypes}
        onSwipeBRTL={() => dispatch({ type: INVERT_METRICS })}
        onSwipeTLBR={() => dispatch({ type: INVERT_METRICS })}
        onSwipeBLTR={() => cycleSource(false)}
        onSwipeTRBL={() => cycleSource(true)}
        onSwipeLeft={() =>
          dispatch({
            type: CYCLE_METRIC,
            gridId: gridId,
            next: true,
            property: "xMetric",
          })
        }
        onSwipeRight={() =>
          dispatch({
            type: CYCLE_METRIC,
            gridId: gridId,
            next: false,
            property: "xMetric",
          })
        }
        onSwipeUp={() =>
          dispatch({
            type: CYCLE_METRIC,
            gridId: gridId,
            next: true,
            property: "yMetric",
          })
        }
        onSwipeDown={() =>
          dispatch({
            type: CYCLE_METRIC,
            gridId: gridId,
            next: false,
            property: "yMetric",
          })
        }
        swipeItems={sourceTypes}
        onDragOverGrid={(item, grid) => {
          return;
          //tried to snap the grid on hover, but problem
          //with child.  i think re render cause issues with
          //events .  return now and just going to
          //normalize drops on edges to1/0
          console.log("TEST DRAG ENTERED", item, grid.id);
          return;
          let uItem = item;

          uItem.gridId = grid.id;
          dispatch(updateSelf(uItem, parentType));
        }}
        onRemoveFromGrid={(item) => {
          console.log("REMOVE ITEM FROM GRID", item);
          let uItem = item;

          uItem.gridId = null;
          uItem[`${xMetric}`] = null;
          uItem[`${yMetric}`] = null;
          dispatch(updateSelf(uItem, parentType));
        }}
        onDropInGrid={async (
          item,
          dims,
          drop,
          objective,
          metrics,
          totalItems
        ) => {
          console.log(
            "on Drop in grid",
            item,
            dims,
            drop,
            objective,
            metrics,
            totalItems
          );
          if (drop?.xMetric?.metricId !== vibe.primaryMetric)
            setState((state) => ({ ...state, showPlanButton: false }));
          const [xRate, yRate] = getXYRelative(dims, drop);
          console.log("RATINGS", xRate, yRate);

          const { snapPoints } = drop || [];

          let sortedPoints = snapPoints.sort((a, b) => a - b);
          let xDifferences = sortedPoints.map((point) => {
            return Math.abs(point / 10 - xRate);
          });

          let yDifferences = sortedPoints.map((point) => {
            return Math.abs(point / 10 - yRate);
          });

          let yMinIndex = -1;
          let xMinIndex = -1;
          xDifferences.reduce((acc, curr, index) => {
            if (curr < acc) {
              xMinIndex = index;
              return curr;
            } else {
              return acc;
            }
          }, Infinity);

          yDifferences.reduce((acc, curr, index) => {
            if (curr < acc) {
              yMinIndex = index;
              return curr;
            } else {
              return acc;
            }
          }, Infinity);

          let snappedX = sortedPoints[xMinIndex] / 10;
          let snappedY = sortedPoints[yMinIndex] / 10;

          let uItem = item;

          uItem.gridId = drop.id;
          if (drop.xMetric)
            uItem[`${drop.xMetric.displayName}`] = Math.min(
              1,
              Math.max(0, snappedX)
            );
          if (drop.yMetric)
            uItem[`${drop.yMetric.displayName}`] = Math.min(
              1,
              Math.max(0, snappedY)
            );

          handleUpdateItemInList(uItem, metrics);
          return;
        }}
        gutter={gutter}
      />

      <VerticalSpacer height={gutter} />
      <div className='pair'>
        <CompleteDropSite activated={_complete} />
        <DeleteDropSite activated={_delete} />
        <button
          disabled={!vibe}
          className='CTA'
          onClick={() => onNewItemClick(metrics)}
        >
          New Item
        </button>
      </div>

      <UnratedList
        {...props}
        //xMetric={xMetric}
        // yMetric={yMetric}
        items={items}
        onItemClick={(item, dims, snapped) => {
          dispatch({ type: TOUCH_ITEM, item: item });
          dispatch({
            type: `SELECT_${_source.type.toUpperCase()}`,
            payload: item,
          });
          dispatch({
            type: OPEN_MODAL,
            component: () => <ItemRecord />,
          });
          // if (snapped) {
          //   dispatch({
          //     type: OPEN_FOOTER_DRAWER,
          //     component: () => (
          //       <TestDrawerItem item={item} parentType={parentType} />
          //     ),
          //     top: dims,
          //   });
          // } else {
          //   dispatch({
          //     type: OPEN_HEADER_DRAWER,
          //     component: () => (
          //       <TestDrawerItem item={item} parentType={parentType} />
          //     ),
          //     bottom: dims,
          //   });
          // }
        }}
        onLongPressEnd={(item, dims, snapped) => {
          setShowComplete(false);
          setShowDelete(false);
        }}
        onLongPressStart={(item) => {
          console.log("ON LONG PRES START");
          setShowComplete(true);
          setShowDelete(true);
          dispatch({ type: TOUCH_ITEM, item: item });
          // dispatch({ type: CLOSE_FOOTER_DRAWER });
          // dispatch({ type: CLOSE_HEADER_DRAWER });
          dispatch({
            type: `SELECT_${_source.type.toUpperCase()}`,
            payload: item,
          });
        }}
        onDragging={(item, dims) => {
          if (item.gridId) return;
          console.log("TEST searching grid", dims);
          if (dropSite) {
            console.log("TEST GRID FOUND");
            dropSite.onHover(item, dropSite);
          }
        }}
        onDrop={(item, dims) => {
          if (dropSite) {
            console.log("MATCHED DROP SITE", dropSite);
            dropSite.onDrop(item, dims, dropSite, objective, metrics);
            // dispatch({
            //   type: OPEN_FOOTER_DRAWER,
            //   component: () => (
            //     <TestDrawerItem item={item} parentType={parentType} />
            //   ),
            //   top: dropSite.bottom,
            // });
          } else {
            if (item.gridId) {
              let itemsCurrentDropSite = getItemInArrayById(
                dropSites,
                item.gridId
              );
              itemsCurrentDropSite?.onRemove(item);
            }
          }

          dispatch({ type: RELEASE_ITEM });

          setState((state) => ({
            ...state,
            isHolding: false,
            grabbedItem: {},
          }));
        }}
      />

      <style jsx>{`
        button {
          border: none;
        }
        .rate-button {
          padding: 3px;
          background-color: lightgreen;
          color: white;
        }

        .glimmer {
          background-color: pink;
        }

        .mood-button {
          font-size: 12px;
          height: 30px;
          width: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          border-radius: 5px;
        }
        .mood-button:nth-child(last) {
          margin-right: 0px;
        }

        .selected {
          background-color: lightblue;
        }
        .selected:nth-child(odd) {
          background-color: lightblue;
        }

        .quiet {
          min-width: 10px;
          border: none;
          margin-right: 5px;
          background-color: white;
        }

        .new-metric {
          background-color: yellow;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 20px;
        }

        button:disabled {
          opacity: 0.3;
          background-color: grey;
        }
        .pair {
          display: flex;
          width: 100%;
          justify-content: space-evenly;
          z-index: 10;
        }

        .evenly-spaced-row {
          width: 100vw;
          position: absolute;
          left: 0;
          display: flex;
          justify-content: space-evenly;
        }

        .absolute {
        }
        .complete,
        .delete {
          font-size: 30px;
          transition: 0.3s ease;
          z-index: 10;
        }

        .delete {
          opacity: ${_delete ? 0.8 : 0.1};
        }

        .complete {
          opacity: ${_complete ? 1 : 0.1};
          margin-right: 20px;
        }

        .grow {
          flex-grow: 1;
        }
        .row {
          display: flex;
        }
        .full-width {
          width: 100vw;
        }
        .spaced {
          justify-content: space-between;
          width: 100vw;
        }

        .centered {
          justify-content: center;
          width: 100%;
        }

        .inline-slider {
          width: 50vw;

          overflow-x: scroll;
          display: flex;
          justify-content: center;
        }

        .half-view-width {
          max-width: 50vw;
        }

        .overflow-row {
          width: 100%;
          display: flex;

          overflow-x: scroll;
          position: relative;
        }

        .stack {
          display: flex;
          flex-direction: column;
        }

        .stack label {
          font-size: 10px;
        }

        .centered {
          align-items: center;
        }
        .rate-manager {
          width: ${screenWidth}px;

          display: flex;
          flex-direction: column;

          padding: ${gutter}px;
          padding-top: 0px;
        }

        .CTA {
          background-color: dodgerblue;
          color: white;
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
        }

        .objective-name {
          lineheight: 20px;
          min-height: 20px;
        }
        .vibe-display-name {
        }
        .quarter {
          width: 25vw;
        }
      `}</style>
    </div>
  );
};

export default RateManager;
