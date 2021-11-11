import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecord } from "../../firebase/firebaseActions";
import {
  removeItemInArray,
  updateItemInArray,
  updateItemPropertyInArray,
} from "../../helpers/helperFunctions";
import { LOADING_FINISHED, LOADING_STARTED } from "../../reducers/asyncReducer";
import {
  DELETE_METRIC,
  UPDATE_DROP_PROPERTY,
  UPDATE_METRICS,
} from "../../reducers/dropReducer";
import { CLOSE_MODAL } from "../../reducers/modalReducer";
import { UPDATE_VIBE } from "../../reducers/vibeReducer";

const ColorManager = () => {
  const metric = useSelector((state) => state.drop.metric);
  const metrics = useSelector((state) => state.drop.metrics || []);
  const vibeId = useSelector((state) => state.vibe.vibe.vibeId);
  const objective = useSelector((state) => state.drop.objective);
  const authUid = useSelector((state) => state.firebase.auth.uid);
  const [_metricState, setMetricState] = useState(metric);
  const [_name, setName] = useState(metric?.displayName);
  const [_nameChanged, setNameChanged] = useState(false);

  const dispatch = useDispatch();
  const [f, u] = useState(0);
  const inputRef = useRef(null);
  const [_color, setColor] = useState(metric.color || "#F9F9F9");

  const onDeleteMetric = useCallback(async () => {
    try {
      dispatch({
        type: LOADING_STARTED,
        message: "deleting metric",
      });

      if (metrics.length < 3) return;

      let metricsAfterDelete = removeItemInArray(
        metrics,
        "metricId",
        metric.metricId
      );

      await updateRecord(
        "vibe_of_user",
        `${vibeId}_${authUid}`,
        "metrics",
        metricsAfterDelete,
        "onDeleteMEtric"
      );
      dispatch({
        type: UPDATE_DROP_PROPERTY,
        key: "metrics",
        value: metricsAfterDelete,
      });
      dispatch({
        type: UPDATE_VIBE,
        key: "metrics",
        value: metricsAfterDelete,
      });

      dispatch({ type: LOADING_FINISHED });
    } catch (error) {
      dispatch({ type: LOADING_FINISHED });
      console.log("error deleting metric", error);
    }
    dispatch({ type: CLOSE_MODAL });
  }, [vibeId, authUid, _metricState, metrics]);

  const handleUpdateItem = async (clearObjective) => {
    console.log("HANDLE UPDATE ITEM");
    try {
      dispatch({
        type: LOADING_STARTED,
        message: "updating metrics",
      });
      let uMetrics = updateItemInArray(metrics, "metricId", _metricState);

      await updateRecord(
        "vibe_of_user",
        `${vibeId}_${authUid}`,
        "metrics",
        uMetrics,
        "moods"
      );
      dispatch({
        type: UPDATE_DROP_PROPERTY,
        key: "metrics",
        value: uMetrics,
      });
      dispatch({ type: UPDATE_VIBE, key: "metrics", value: uMetrics });

      if (clearObjective) {
        let uObjective = Object.assign({}, objective);
        console.log("LETS CLEAR OLD VALUES", objective);
        let uItems = uObjective.items || [];
        uItems = uItems.map((item) => {
          return Object.assign(item, (item[`${newItem.displayName}`] = null));
        });
        console.log("updated items", uItems);
        uObjective.items = uItems;
        dispatch({
          type: UPDATE_DROP_PROPERTY,
          key: "objective",
          value: uObjective,
        });

        await updateRecord(
          "objective_of_user",
          uObjective.id,
          "items",
          uItems,
          "colorManager"
        );
      }

      dispatch({ type: LOADING_FINISHED });
    } catch (error) {
      console.log("error updating color", error);
      dispatch({ type: LOADING_FINISHED });
    }
  };
  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, [inputRef.current]);
  const updateMetricName = (currentName, value) => {
    let uMetrics = metrics;

    if (metrics.filter((m) => m.displayName === value).length > 0) {
      {
        setName("");
        inputRef.current.focus();
        return window.alert("name is already in use");
      }
    }
    uMetrics = updateItemPropertyInArray(
      uMetrics,
      "displayName",
      currentName,
      "displayName",
      value
    );
    dispatch({ type: UPDATE_METRICS, metrics: uMetrics });

    u(f + 1);
  };
  const updateMetric = async () => {
    try {
      if (_metricState.displayName.includes("urgent")) {
        window.alert("Urgent is special for app");
        return;
      } else if (_metricState.displayName.includes("important")) {
        window.alert("important is special for app");
        return;
      } else if (
        metrics
          .filter((m) => m.metricId !== _metricState.metricId)
          ?.find((m) => m.displayName === _metricState.displayName)
      ) {
        {
          inputRef.current.focus();
          window.alert("name is already in use");
          return;
        }
      } else {
        if (objective) {
          if (
            window.confirm(
              `Clear ${metric.displayName} from ${objective.objective}`
            )
          )
            await handleUpdateItem(true);
        } else await handleUpdateItem(false);

        dispatch({ type: CLOSE_MODAL });
        u(f + 1);
      }
    } catch (error) {
      console.log("error updating metric", error);
    }
  };

  if (!metric) return <div></div>;

  return (
    <div className='color-manager'>
      <div className='row'>
        <input
          className='box'
          type='color'
          onChange={(e) => {
            setMetricState((state) => ({
              ...state,
              color: e.target.value,
            }));
          }}
          value={_metricState.color}
        />
        <input
          ref={inputRef}
          maxLength='10'
          type='text'
          value={_metricState.displayName}
          id={metric?.displayName}
          onChange={(e) => {
            setMetricState((state) => ({
              ...state,
              displayName: e.target.value,
            }));
          }}
          //    onBlur={(e) => updateMetricName(metric.displayName, e.target.value)}
        />
      </div>

      <input
        value={_metricState.weight}
        onChange={(e) => {
          setMetricState((state) => ({
            ...state,
            weight: e.target.value,
          }));
        }}
        type='range'
        id={metric?.displayName}
        name='vol'
        min='0'
        step='.05'
        max='1'
      />
      <div className='button-row'>
        <div
          onClick={() =>
            setMetricState((state) => ({
              ...state,
              positive: true,
            }))
          }
          className={`button ${_metricState?.positive ? "selected" : ""}`}
        >
          Positive
        </div>
        <div
          onClick={() =>
            setMetricState((state) => ({
              ...state,
              positive: false,
            }))
          }
          className={`button ${_metricState.positive ? "" : "selected"}`}
        >
          Negative
        </div>
      </div>

      <div className='button-row'>
        <button
          onClick={() => {
            if (window.confirm("Remove Metric and ratings for items"))
              onDeleteMetric();
          }}
        >
          Remove Metric
        </button>

        <button className='primary' onClick={updateMetric}>
          Set Metric
        </button>
      </div>

      <style jsx>{`
        .primary {
          color: white;
          background-color: dodgerblue;
        }
        .button-row {
          display: flex;
          width: 100%;
          justify-content: space-evenly;
          margin-bottom: 20px;
          margin-top: 10px;
        }
        .button {
          padding: 5px;
          border-radius: 3px;
          color: blue;
          margin-right: 10px;
          border: 1px solid blue;
        }

        .selected {
          background-color: blue;
          color: white;
        }
        .row {
          display: flex;
          margin-bottom: 40px;
        }
        .box {
          min-width: 30px;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background-color: ${metric.color};

          margin-right: 20px;
        }
        .box:before {
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 10px;
        }
        .color-manager {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        input {
          position: relative;
        }
        input:before {
          content: "weighted value";
          position: absolute;
          left: -20px;
          top: -20px;
        }
        input:after {
          content: "${metric.weight}";
          position: absolute;
          top: -20px;
          right: 0px;
        }
      `}</style>
    </div>
  );
};

export default ColorManager;
