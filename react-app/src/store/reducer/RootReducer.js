import { SET_USER, GET_PRODUCTS } from "../action/actionTypes";

const initState = {
  user: null,
  products: []
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
