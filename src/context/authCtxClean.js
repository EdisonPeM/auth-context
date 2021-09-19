import { createContext, useCallback, useEffect, useReducer } from "react";
import authReducer, { initialState } from "./reducer";
import {
  cancelGetUserData,
  deleteUserData,
  getUserData,
  refreshAccessToken,
  setUserData
} from "./actions";

import fakeToken from "../utils/fakeToken";
import getRandomUser from "../utils/randomUser";
import fakeDelay from "../utils/fakeDelay";

export const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  refreshToken: () => {}
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getUserLoggedData = async () => {
      try {
        const accessToken = fakeToken();
        const userData = await getRandomUser();
        dispatch(setUserData(accessToken, userData));
      } catch (error) {
        dispatch(cancelGetUserData());
      }
    };

    getUserLoggedData();
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      if (state.isAuth) return;
      dispatch(getUserData());
      const accessToken = fakeToken();
      const userData = await getRandomUser();
      dispatch(setUserData(accessToken, userData));
    },
    [state.isAuth]
  );

  const logout = useCallback(async () => {
    await fakeDelay(0.5);
    dispatch(deleteUserData());
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await fakeDelay(0.3);
      const accessToken = fakeToken();
      dispatch(refreshAccessToken(accessToken));
    } catch (error) {
      dispatch(deleteUserData());
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
