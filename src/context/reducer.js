import {
  START_FETCH_USER_DATA,
  FINISH_GET_USER_DATA,
  REFRESH_ACCESS_TOKEN,
  REMOVE_USER_DATA,
  SET_USER_DATA
} from "./actions";

export const initialState = {
  loadingAuth: true,
  isAuth: false,
  token: "",
  userData: null
};

export default function authReducer(state, { type, payload }) {
  switch (type) {
    case START_FETCH_USER_DATA:
      return { ...state, loadingAuth: true };
    case FINISH_GET_USER_DATA:
      return { ...state, loadingAuth: false };
    case SET_USER_DATA:
      return {
        loadingAuth: false,
        isAuth: true,
        token: payload.token,
        userData: payload.userData
      };
    case REMOVE_USER_DATA:
      return { ...initialState, loadingAuth: false };
    case REFRESH_ACCESS_TOKEN:
      return { ...state, token: payload.token };
    default:
      throw new Error();
  }
}
