export const CLOSE_RIGHT_DRAWER = "CLOSE_RIGHT_DRAWER";
export const OPEN_RIGHT_DRAWER = "OPEN_RIGHT_DRAWER";

const initialState = {
  opened: false,
};

export const rightDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_RIGHT_DRAWER:
      return Object.assign(state, {
        opened: true,
        component: action.component,
      });
    case CLOSE_RIGHT_DRAWER:
      return Object.assign(state, {
        opened: false,
      });

    default:
      return state;
  }
};
