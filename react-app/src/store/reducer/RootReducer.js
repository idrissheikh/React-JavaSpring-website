import {
  SET_USER,
  GET_PRODUCTS,
  SET_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  GET_ORDER_HISTORY
} from "../action/actionTypes";
import { orderHistory } from "../action/actions";

const initState = {
  user: null,
  products: [],
  cartItems: [],
  orderHistory: []
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

    case GET_ORDER_HISTORY: {
      console.log("actino payload: ", action.payload);
      return {
        ...state,
        orderHistory: action.payload
      };
    }

    case SET_PRODUCT_TO_CART: {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    }

    case REMOVE_PRODUCT_FROM_CART: {
      const updatedCart = state.cartItems.filter(
        item => item.id != action.payload.id
      );
      return {
        ...state,
        cartItems: updatedCart
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
