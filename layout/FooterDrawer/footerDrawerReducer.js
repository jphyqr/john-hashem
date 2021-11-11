export const OPEN_FOOTER_DRAWER = "OPEN_FOOTER_DRAWER";
export const CLOSE_FOOTER_DRAWER = "CLOSE_FOOTER_DRAWER";
export const START_FOOTER_DRAWER = "START_FOOTER_DRAWER";
export const FINISH_FOOTER_DRAWER = "FINISH_FOOTER_DRAWER";
const initialState = {
  opened: false,
  ignoreClasses: [],
  parentId: null,
  loading: false,
};

export const footerDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FOOTER_DRAWER:
      return Object.assign(state, {
        loading: true,
      });
    case FINISH_FOOTER_DRAWER:
      return Object.assign(state, {
        loading: false,
      });
    case OPEN_FOOTER_DRAWER:
      return {
        ...state,
        opened: true,
        component: action.component,
        top: action.top,
        ignoreClasses: action.ignoreClasses,
        parentId: action.parentId,
      };
      break;
    case CLOSE_FOOTER_DRAWER:
      return initialState;

    default:
      return state;
  }
};
