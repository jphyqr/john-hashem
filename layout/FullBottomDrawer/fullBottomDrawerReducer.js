export const CLOSE_FULL_BOTTOM_DRAWER = "CLOSE_FULL_BOTTOM_DRAWER";
export const OPEN_FULL_BOTTOM_DRAWER = "OPEN_FULL_BOTTOM_DRAWER";

const initialState = {
  opened: false,
  component: null,
};

export const fullBottomDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FULL_BOTTOM_DRAWER:
      return {
        ...state,
        opened: true,
        component: action.component,
      };
    case CLOSE_FULL_BOTTOM_DRAWER:
      return initialState;

    default:
      return state;
  }
};
