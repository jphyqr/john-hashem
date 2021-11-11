import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRect } from "../../hooks/useRect";
import {
  EXIT_COMPLETE_SITE,
  EXIT_DELETE_SITE,
  SET_COMPLETE_SITE,
  SET_DELETE_SITE,
} from "../../reducers/dropReducer";
import { UPDATE_ITEM } from "../../reducers/vibeReducer";

const CompleteDropSite = ({ activated }) => {
  const dispatch = useDispatch();
  const completeRef = useRef(null);
  const [completeRect] = useRect(completeRef);
  const completeSiteHovered = useSelector(
    (state) => state.drop.completeSiteHovered || false
  );
  useEffect(() => {
    const storeCompleteRect = () => {
      dispatch({
        type: SET_COMPLETE_SITE,
        completeSite: {
          left: completeRect.left,
          right: completeRect.right,
          top: completeRect.top,
          bottom: completeRect.bottom,
          onComplete: (item) => {
            let uItem = Object.assign(item, { completed: true });
            dispatch({ type: UPDATE_ITEM, item: uItem });
            dispatch({ type: EXIT_COMPLETE_SITE });
          },
          onHover: () => {},
        },
      });
    };
    if (!completeRect || completeRect.width === 0 || completeRect.height === 0)
      return;

    storeCompleteRect();
  }, [completeRect]);

  const memoStyle = useMemo(
    () => ({
      transform: completeSiteHovered ? "scale(1.5)" : "scale(1)",
      opacity: completeSiteHovered ? 1 : activated ? 0.6 : 0.1,
    }),
    [completeSiteHovered, activated]
  );
  return (
    <div style={memoStyle} ref={completeRef} className='delete'>
      ✔️
      <style jsx>{`
        .delete {
          font-size: 30px;
          transition: 0.3s ease;
          z-index: 10;
        }

        .delete {
        }
      `}</style>
    </div>
  );
};

export default CompleteDropSite;
