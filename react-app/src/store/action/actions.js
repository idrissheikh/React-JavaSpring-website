import { SET_USER, GET_PRODUCTS } from "./actionTypes";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    payload: products
  };
};
