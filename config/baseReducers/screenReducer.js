const initialState = {};
export const SET_SCREEN_WIDTH = "SET_SCREEN_WIDTH";
export const SCREEN_TYPE = {
  WIDE: "WIDE",
  MEDIUM: "MEDIUM",
  MOBILE: "MOBILE",
};

export const SCREEN_WIDTH_MIN = {
  WIDE: 1100,
  MEDIUM: 650,
  MOBILE: 0,
};

export const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_WIDTH:
      return action.payload;

    default:
      return state;
  }
};
