export const CLOSE_TOP_RIGHT_DRAWER = "CLOSE_TOP_RIGHT_DRAWER";
export const OPEN_TOP_RIGHT_DRAWER = "OPEN_TOP_RIGHT_DRAWER";
const initialState = {
  opened: false,
  component: null,
};

export const topRightDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TOP_RIGHT_DRAWER:
      return Object.assign(state, {
        opened: true,
        component: action.component,
      });
    case CLOSE_TOP_RIGHT_DRAWER:
      return Object.assign(state, {
        opened: false,
        component: null,
      });

    default:
      return state;
  }
};
