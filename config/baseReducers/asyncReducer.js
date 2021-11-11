export const LOADING_STARTED = "LOADING_STARTED";
export const LOADING_FINISHED = "LOADING_FINISHED";
const initialState = {
  loading: false,
  message: "",
};

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return Object.assign(state, { loading: true, message: action.message });

    case LOADING_FINISHED:
      return Object.assign(state, { loading: false, message: "" });

    default:
      return state;
  }
};
