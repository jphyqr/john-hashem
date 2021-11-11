export const DRAG_ITEM = "DRAG_ITEM";
export const RELEASE_ITEM = "RELEASE_ITEM";
export const containedLeftPxFromXRate = (
  xRate,
  containerLeft,
  containerWidth,
  itemWidth
) => {
  let containedArea = containerWidth - itemWidth;
  let pxFromContainerEdge = xRate * containedArea;
  return containerLeft + pxFromContainerEdge;
};

export const containedBottomPxFromYRate = (
  yRate,
  containerBottom,
  containerHeight,
  itemHeight
) => {
  let containedArea = containerHeight - itemHeight;
  let pxFromContainerEdge = yRate * containedArea;
  return containerBottom - pxFromContainerEdge;
};
const initialState = {
  item: {},
};

export const dragReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAG_ITEM:
      return Object.assign(state, { item: action.payload });
      break;
    case RELEASE_ITEM:
      return Object.assign(state, initialState);
      break;

    default:
      return state;
  }
};
