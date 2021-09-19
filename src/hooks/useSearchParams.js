import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function useSearchParams() {
  const location = useLocation();
  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let [attr, value] of searchParams.entries()) {
      params[attr] = value;
    }
    return params;
  }, [location]);
}

export default useSearchParams;
