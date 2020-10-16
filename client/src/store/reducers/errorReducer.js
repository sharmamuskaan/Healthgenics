import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
