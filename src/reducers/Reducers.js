import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "../contexts/Action.types";
const Reducers = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, isLoading: false, data: payload.list };
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export default Reducers;
