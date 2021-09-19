import { createContext, useCallback, useEffect, useReducer } from "react";
import getRandomUser from "../utils/randomUser";
import fakeDelay from "../utils/fakeDelay";
import fakeToken from "../utils/fakeToken";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";

import authReducer, { initialState } from "./reducer";
import {
  deleteUserData,
  setUserData,
  refreshAccessToken,
  getUserData,
  cancelGetUserData
} from "./actions";

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
        logger.info("[ctx] Effect in First Render");

        // DELETE this, the validation of the refresh Token is done on the SERVER side
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("no refreshToken is provided");

        // DELETE this, the validation of the refresh Token is done on the SERVER side
        const { exp } = jwt.decode(refreshToken);
        const timeDiff = new Date(new Date(exp * 1000) - Date.now());
        if (timeDiff < 0) throw new Error("refreshToken is expired");

        // Get Data from server
        logger.info("[ctx] Get User Data");
        const accessToken = fakeToken();
        const userData = await getRandomUser();

        logger.info("[ctx] Update state");
        dispatch(setUserData(accessToken, userData));

        // DELETE this when fetch to server, cookie is delete in server
        setTimeout(() => {
          logger.log("[ctx] %cRefresh Token Expired", "font-weight: bold");
          localStorage.removeItem("refreshToken");
        }, timeDiff.getTime());
      } catch (error) {
        logger.log("[ctx]", error.message);
        dispatch(cancelGetUserData());
      }
    };

    getUserLoggedData();
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      // avoid innecesary fetch ?
      if (state.isAuth) return;
      dispatch(getUserData());
      logger.info("[ctx] Login");

      // DELETE this when use Fetch
      await fakeDelay(0.2);
      const accessToken = fakeToken();
      const userData = await getRandomUser();
      dispatch(setUserData(accessToken, userData));

      // DELETE this when fetch to server, isLogged is cached in some Http Cookie;
      localStorage.setItem("refreshToken", fakeToken("5m"));

      // DELETE this when fetch to server, cookie is delete in server
      setTimeout(() => {
        logger.log("[ctx] %cRefresh Token Expired", "font-weight: bold");
        localStorage.removeItem("refreshToken");
      }, 1000 * 60 * 5);
    },
    [state.isAuth]
  );

  const logout = useCallback(async () => {
    // Fetch to Server for logout
    logger.info("[ctx] Logout");

    // DELETE when use fetch
    await fakeDelay(0.5);
    dispatch(deleteUserData());

    // DELETE this when fetch to server, cookie is delete in server
    localStorage.removeItem("refreshToken");
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      // Fetch to Server for the New Token
      logger.info("[ctx] refresh Token");

      // the validation of the refresh Token is done on the SERVER side
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("no refreshToken is provided");

      // DELETE when use fetch
      await fakeDelay(0.3);

      const accessToken = fakeToken();
      dispatch(refreshAccessToken(accessToken));
    } catch (error) {
      logger.log("[ctx]", error.message);
      dispatch(deleteUserData());
    }
  }, []);

  logger.log("---------- [AuthContext] ----------");
  logger.info("[ctx] state:", state);
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
