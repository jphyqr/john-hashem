const initialState = false;
export const CLEAR_BLOCKER = "CLEAR_BLOCKER";
export const ISOLATE_NODE = "ISOLATE_NODE";
export const DISABLE_OUTSIDE_CLICK = "DISABLE_OUTSIDE_CLICK";
export const SET_DIMMER_BLOCK = "SET_DIMMER_BLOCK";
export const blockedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIMMER_BLOCK:
      return true;

    case DISABLE_OUTSIDE_CLICK:
      return true;
    case CLEAR_BLOCKER:
      return false;
    case ISOLATE_NODE:
      return action.node;
    default:
      return state;
  }
};
