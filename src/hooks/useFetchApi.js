import { useEffect, useState } from "react";
import fakeFetch from "../utils/fakeFetch";
import logger from "../utils/logger";
import useAuthCtx from "./useAuthCtx";
import jwt from "jsonwebtoken";

const BASE_URL = "";
function useFetchApi(endpoint = "") {
  const { token, refreshToken } = useAuthCtx();
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  logger.log("[useFetchApi] loading", state.loading);
  useEffect(() => {
    const getData = async () => {
      try {
        logger.log("[useFetchApi] token", token);
        const { exp } = jwt.decode(token);
        const timeDiff = new Date(new Date(exp * 1000) - Date.now());

        logger.log(
          "[useFetchApi] token Expires In",
          timeDiff.getTime() / 1000,
          "s"
        );
        if (timeDiff < 0) {
          logger.log("[useFetchApi] %cToken Expired", "font-weight: bold");
          return refreshToken();
        }

        logger.log("[useFetchApi] Fetch Data");
        const res = await fakeFetch(`${BASE_URL}${endpoint}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` }
        });

        //  Alternatively, if I have public endpoints
        // I can catch 403 code and join it with expiredTokenTimeDiff

        logger.info("[useFetchApi] res.status:", res.status);
        const data = await res.json();
        setState({
          data,
          loading: false,
          error: null
        });
      } catch (error) {
        logger.error("[useFetchApi] error:", error);
        setState({
          error,
          data: null,
          loading: false
        });
      }
    };

    getData();
    // refreshToken no debería estar en dependencias :O
  }, [endpoint, token, refreshToken]);

  return state;
}

export default useFetchApi;
