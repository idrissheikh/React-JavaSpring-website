import {
  SET_USER,
  GET_PRODUCTS,
  SET_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  GET_ORDER_HISTORY
} from "./actionTypes";
import API from "../../services/api";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const getProducts = () => dispatch => {
  API.getAllProducts()
    .then(products => dispatch({ type: GET_PRODUCTS, payload: products }))
    .catch(err => console.log("errr: ", err));
};

export const setProductToCart = product => {
  return {
    type: SET_PRODUCT_TO_CART,
    payload: product
  };
};

export const removeProductFromCart = product => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: product
  };
};

export const getOrderHistory = id => dispatch => {
  API.getOrderHistoryByUser(id)
    .then(orderHistory =>
      dispatch({ type: GET_ORDER_HISTORY, payload: orderHistory })
    )
    .catch(err => console.log("errr: ", err));
};
