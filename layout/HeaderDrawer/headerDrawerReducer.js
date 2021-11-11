export const OPEN_HEADER_DRAWER = "OPEN_HEADER_DRAWER";
export const CLOSE_HEADER_DRAWER = "CLOSE_HEADER_DRAWER";
export const START_HEADER_DRAWER = "START_HEADER_DRAWER";
export const FINISH_HEADER_DRAWER = "FINISH_HEADER_DRAWER";
const initialState = {
  opened: false,
  loading: false,
};

export const headerDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_HEADER_DRAWER:
      return Object.assign(state, {
        loading: true,
      });
    case FINISH_HEADER_DRAWER:
      return Object.assign(state, {
        loading: false,
      });
    case OPEN_HEADER_DRAWER:
      return Object.assign(state, {
        opened: true,
        component: action.component,
        bottom: action.bottom,
      });
      break;
    case CLOSE_HEADER_DRAWER:
      return Object.assign(state, initialState);
    default:
      return state;
  }
};
