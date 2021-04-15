import { FETCH_USER } from "../actions/types";

const INITIAL_STATE = null;

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
