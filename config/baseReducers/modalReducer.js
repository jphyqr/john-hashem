//REDUCERS AER PURE FUNCTIONS

//expor because we are going to combine in combineReducers
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
const initialState = {
  opened: false,
  onClose: function () {},
  modalProps: {},
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        opened: true,
        component: action.component,
        onClose: action.onClose || function () {},
        modalProps: action.modalProps || {},
      };
    case CLOSE_MODAL:
      state.onClose();
      return initialState;
    default:
      return state;
  }
};
