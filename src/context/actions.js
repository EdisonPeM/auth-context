export const START_FETCH_USER_DATA = "START_FETCH_USER_DATA";
export const FINISH_GET_USER_DATA = "FINISH_GET_USER_DATA";

export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";

export const getUserData = () => ({ type: START_FETCH_USER_DATA });
export const cancelGetUserData = () => ({ type: FINISH_GET_USER_DATA });

export const setUserData = (token, userData) => ({
  type: SET_USER_DATA,
  payload: { token, userData }
});

export const deleteUserData = () => ({ type: REMOVE_USER_DATA });

export const refreshAccessToken = (token) => ({
  type: "REFRESH_ACCESS_TOKEN",
  payload: { token }
});
