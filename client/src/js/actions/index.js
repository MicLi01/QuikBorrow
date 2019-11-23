import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { FETCH_PRODUCTS, FETCH_PRODUCT, SEARCH, GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Fetch all products
export const fetchProducts = () => {
  return async function(dispatch) {
    const res = await axios.get("/api/items");
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  };
};

// Get one product
export const fetchProduct = itemId => {
  return async function(dispatch) {
    const res = await axios.get(`/api/items/${itemId}`);
    dispatch({ type: FETCH_PRODUCT, payload: res.data });
  };
};

/**
 *  Search by query for items in database by calling {@link Action} to backend
 *  @param {String} query - query string to search
 *  @returns {Function} dispatch - used to dispatch actions
 */
export const searchProducts = query => 
  /**
   *  @param {Function} dispatch - used to dispatch actions
   *  @returns {Promise<Object>} - response from an {@link Action}
   */
  dispatch => {
    return axios
        .get("/api/items/search", { params: { param: query} })
        .then(res => {
          dispatch({ type: SEARCH, payload: res.data });
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        });
  };

// Register User
export const registerUser = (userData, history) => dispatch => {
  return axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  return axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
