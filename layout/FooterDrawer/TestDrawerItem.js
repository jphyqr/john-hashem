import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenericForEdit } from "../../firebase/firebaseActions";
import VerticalSpacer from "../spacers/VerticalSpacer";

const TestDrawerItem = ({ item, parentType }) => {
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.drop.metrics || []);

  return (
    <div className='test-drawer-item'>
      <div className='head'>
        <div
          onClick={() => dispatch(selectGenericForEdit(item, parentType))}
          className='button'
        >
          Edit
        </div>

        <div className='button'>X</div>
      </div>
      <div className='body'>
        <div> {item.displayName}</div>
        <div> {item.description}</div>
      </div>

      <VerticalSpacer height='10' />

      {metrics.map((metric, i) => {
        return (
          <div className='row spaced'>
            <div className='metric' key={i}>
              {metric.displayName}
            </div>

            <input
              value={item[`${metric.displayName}`]}
              onChange={(e) =>
                updateMetrics(e.target.id, e.target.value, "weight")
              }
              className='range'
              type='range'
              id={metric.displayName}
              name='vol'
              min='0'
              step='.05'
              max='1'
            />
          </div>
        );
      })}

      <h4>{item.important}</h4>
      <style jsx>{`
        .head {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
        .range {
          color: red;
          background-color: red;
        }
        .test-drawer-item {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .row {
          display: flex;
          width: 100%;
          justify-content: space-evenly;
        }

        .spaced {
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default TestDrawerItem;
