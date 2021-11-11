export const INITIALIZE_GRID = "INITIALIZE_GRID";

const initialState = {
  top: null,
  left: null,
  bottom: null,
  right: null,
};

export const rateReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      return Object.assign(state, action.dimensions);
      break;

    default:
      return state;
  }
};
