import { useEffect, useState } from "react";
import fakeFetch from "../utils/fakeFetch";
import logger from "../utils/logger";

const BASE_URL = "";
function useFetchApi(endpoint = "") {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  logger.log("[useFetchPublicApi] loading", state.loading);
  useEffect(() => {
    const getData = async () => {
      try {
        logger.log("[useFetchPublicApi] Fetch Data");
        const res = await fakeFetch(`${BASE_URL}${endpoint}`);
        const data = await res.json();
        setState({
          data,
          loading: false,
          error: null
        });
      } catch (error) {
        logger.error("[useFetchPublicApi] error:", error);
        setState({
          error,
          data: null,
          loading: false
        });
      }
    };

    getData();
  }, [endpoint]);

  return state;
}

export default useFetchApi;
