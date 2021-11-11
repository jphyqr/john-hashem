import { fromPairs } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_HEADER_DRAWER } from "../../layout/HeaderDrawer/headerDrawerReducer";
import VerticalSpacer from "../../layout/spacers/VerticalSpacer";
import { LOADING_FINISHED, LOADING_STARTED } from "../../reducers/asyncReducer";
import { CYCLE_METRIC, UPDATE_DROP_PROPERTY } from "../../reducers/dropReducer";
import { SET_ITEMS } from "../../reducers/vibeReducer";
import VibeManager from "../VibeManager/VibeManager";
import { updateItemRatingsForUser } from "./rateActions";

const ActionButtons = () => {
  const dispatch = useDispatch();
  const vibe = useSelector((state) => state.vibe.vibe);
  const items = useSelector((state) => state.vibe.items || []);
  const metrics = useSelector((state) => state.drop.metrics || []);
  const xMetric = useSelector((state) => state.drop.xMetric || null);
  const yMetric = useSelector((state) => state.drop.yMetric || null);
  const itemsUpdated = useSelector((state) => state.vibe.updatedOn);
  const itemsChanged = useSelector((state) => state.vibe.itemsChanged);
  const numberOfUrgentRatedItems = items?.filter(
    (i) => i[`${vibe.primaryMetric}`]
  )?.length;
  const [state, setState] = useState({
    completedRates: 0,
    totalRates: 0,
    previouslyRated: false,

    isRating: true,
    isPlanning: false,
    isExecuting: false,
    highlightRateButton: false,
    enableExecutingButton: false,
    enablePlanButton: false,
  });

  useEffect(() => {
    if (items?.length > 0 && items.length === numberOfUrgentRatedItems)
      setState((state) => ({
        ...state,
        enableExecutingButton: true,
      }));
  }, [itemsUpdated, numberOfUrgentRatedItems]);

  useEffect(() => {
    if (state.isRating)
      setState((state) => ({
        ...state,

        highlightRateButton: true,
      }));
  }, [itemsChanged]);

  useEffect(() => {
    let completedRates = 0;
    for (const item of items) {
      for (const metric of metrics) {
        if (typeof item[`${metric.displayName}`] == "number") completedRates++;
      }
    }
    const totalRates = items.length * metrics.length;
    const ratesCompleted = completedRates === totalRates ? true : false;

    setState((state) => ({
      ...state,
      totalRates: totalRates,
      completedRates: completedRates,
      enablePlanButton: ratesCompleted,
    }));
  }, [itemsUpdated]);

  const handleRate = async () => {
    try {
      dispatch({ type: LOADING_STARTED, message: "rating objective" });

      setState((state) => ({
        ...state,
        isRating: true,
        highlightRateButton: false,
        isExecuting: false,
        isPlanning: false,
      }));

      let uItems = items.map((uItem) => {
        let compoundScore = 0;
        let maxScore = 0;

        for (const metric of metrics) {
          compoundScore = metric.positive
            ? compoundScore +
              uItem[`${metric.displayName}`] * parseFloat(metric.weight)
            : compoundScore +
              (1 - uItem[`${metric.displayName}`]) * parseFloat(metric.weight);
          maxScore = maxScore + parseFloat(metric.weight);
        }

        uItem.newItem = false;
        let finalScore = compoundScore / maxScore;
        uItem[`${vibe.compoundMetric}`] = finalScore;
        return uItem;
      });

      await updateItemRatingsForUser(uItems);

      dispatch({ type: SET_ITEMS, items: uItems });

      setState((state) => ({ ...state, showPlanButton: true }));

      //TODO : update each item  with ratings in firebase?

      //TODO : allow to update airtable records?
      //should probably do this with an airtable sync function somewhere

      dispatch({ type: LOADING_FINISHED });
    } catch (error) {
      dispatch({ type: LOADING_FINISHED });
      console.log("error handling rate", error);
    }
  };

  const handleExecute = async () => {
    try {
      dispatch({ type: LOADING_STARTED, message: "final grading" });

      setState((state) => ({
        ...state,
        isRating: false,
        highlightRateButton: false,
        isExecuting: true,
        isPlanning: false,
      }));
      await updateItemRatingsForUser(items);
      dispatch({
        type: UPDATE_DROP_PROPERTY,
        key: "xMetric",
        value: {
          weight: 1,
          positive: true,
          metricId: vibe.primaryMetric,
          displayName: vibe.primaryMetric,
          color: "red",
        },
      });

      dispatch({
        type: UPDATE_DROP_PROPERTY,
        key: "yMetric",
        value: {
          weight: 1,
          positive: true,
          metricId: vibe.compoundMetric,
          displayName: vibe.compoundMetric,
          color: "gold",
        },
      });
      dispatch({ type: LOADING_FINISHED });
    } catch (error) {
      console.log("error updating items", error);
      dispatch({ type: LOADING_FINISHED });
    }
  };

  const handlePlan = async () => {
    setState((state) => ({
      ...state,
      isRating: false,
      highlightRateButton: false,
      isExecuting: false,
      isPlanning: true,
    }));
    dispatch({
      type: UPDATE_DROP_PROPERTY,
      key: "xMetric",
      value: {
        weight: 1,
        positive: true,
        metricId: vibe.primaryMetric,
        displayName: vibe.primaryMetric,
        color: "red",
      },
    });

    dispatch({
      type: UPDATE_DROP_PROPERTY,
      key: "yMetric",
      value: {
        weight: 1,
        positive: true,
        metricId: "lockY",
        displayName: "lockY",
        color: "white",
      },
    });
  };

  const completionIndicatorStyle = useMemo(
    () => ({
      height: 3,
      width: `${(state.completedRates / state.totalRates) * 100}%`,
      backgroundColor: "lightgreen",
      transition: ".3s all ease",
    }),
    [state.completedRates, state.totalRates]
  );

  useEffect(() => {
    if (!vibe?.id) return;

    handleRate();
  }, [vibe?.id]);

  return (
    <section className='completion-indicator-container'>
      <div className='row full-width evenly-spaced'>
        <button
          onClick={
            state.highlightRateButton
              ? () => handleRate()
              : async () => {
                  setState((state) => ({
                    ...state,
                    isRating: true,
                    isPlanning: false,
                    isExecuting: false,
                  }));
                  dispatch({
                    type: UPDATE_DROP_PROPERTY,
                    key: "xMetric",
                    value: metrics[0],
                  });
                  dispatch({
                    type: UPDATE_DROP_PROPERTY,
                    key: "yMetric",
                    value: metrics[1],
                  });
                }
          }
          className={`rate-button ${state.isRating ? "selected" : ""} ${
            state.highlightRateButton ? "highlight" : ""
          }`}
        >
          Rate
        </button>
        <button
          disabled={!state.enablePlanButton}
          onClick={
            vibe?.primaryMetric
              ? () => handlePlan()
              : () => {
                  window.alert("Need to set a primary metric");
                  dispatch({
                    type: OPEN_HEADER_DRAWER,
                    component: () => <VibeManager />,
                  });
                }
          }
          className={`rate-button ${state.isPlanning ? "selected" : ""}`}
        >
          Plan
        </button>

        <button
          disabled={!state.enableExecutingButton}
          onClick={
            vibe?.compoundMetric
              ? () => handleExecute()
              : () => {
                  window.alert("Need to set a compound metric");
                  dispatch({
                    type: OPEN_HEADER_DRAWER,
                    component: () => <VibeManager />,
                  });
                }
          }
          className={`rate-button ${state.isExecuting ? "selected" : ""}`}
        >
          Execute
        </button>
      </div>
      <VerticalSpacer height='10' />
      <div
        className='completion-indicator'
        style={completionIndicatorStyle}
      ></div>
      <style jsx>{`
        .completion-indicator {
          display: flex;
        }
        section {
          position: relative;
        }
        .row {
          display: flex;
        }
        .full-width {
          width: 100vw;
        }
        .evenly-spaced {
          justify-content: space-evenly;
        }

        .highlight {
          transform: scale(1.3);
          transition: 0.3s all ease;
          background-color: black;
          color: white;
        }

        .selected {
          background-color: blue;
          color: white;
        }
        .completion-indicator-container {
          width: 100%;

          display: flex;
          flex-direction: column;

          align-items: center;
          position: relative;
        }
      `}</style>
    </section>
  );
};

export default ActionButtons;
