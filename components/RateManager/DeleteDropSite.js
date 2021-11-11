import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc } from "../../firebase/firebaseActions";
import { useRect } from "../../hooks/useRect";
import { EXIT_DELETE_SITE, SET_DELETE_SITE } from "../../reducers/dropReducer";
import { REMOVE_ITEM } from "../../reducers/vibeReducer";

const DeleteDropSite = ({ activated }) => {
  const dispatch = useDispatch();
  const deleteRef = useRef(null);
  const [deleteRect] = useRect(deleteRef);
  const deleteSiteHovered = useSelector(
    (state) => state.drop.deleteSiteHovered || false
  );
  useEffect(() => {
    const storeDeleteRect = () => {
      console.log({ deleteRect });
      dispatch({
        type: SET_DELETE_SITE,
        deleteSite: {
          left: deleteRect.left,
          right: deleteRect.right,
          top: deleteRect.top,
          bottom: deleteRect.bottom,
          onDelete: async (item) => {
            await deleteDoc("item_of_user", item.id);
            dispatch({ type: REMOVE_ITEM, id: item.id });
            dispatch({ type: EXIT_DELETE_SITE });
          },
          onHover: () => {
            console.log("On Hover");
          },
        },
      });
    };
    if (!deleteRect || deleteRect.width === 0 || deleteRect.height === 0)
      return;

    storeDeleteRect();
  }, [deleteRect]);

  const memoStyle = useMemo(
    () => ({
      transform: deleteSiteHovered ? "scale(1.5)" : "scale(1)",
      opacity: deleteSiteHovered ? 1 : activated ? 0.6 : 0.1,
    }),
    [deleteSiteHovered, activated]
  );
  return (
    <div style={memoStyle} ref={deleteRef} className='delete'>
      🗑️
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

export default DeleteDropSite;
