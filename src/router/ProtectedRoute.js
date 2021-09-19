import useAuthCtx from "../hooks/useAuthCtx";
import { Route, Redirect } from "react-router-dom";
import logger from "../utils/logger";
import Loading from "../components/Loading";

function ProtectedRoute(props) {
  const { loadingAuth, isAuth } = useAuthCtx();
  logger.log(`========== [ProtectedRoute: ${props.path}] ==========`);
  logger.log("[ProtectedRoute] isAuth:", isAuth);
  logger.log("[ProtectedRoute] loadingAuth:", loadingAuth);
  if (loadingAuth) return <Loading />; // Loading Placeholder
  if (isAuth) return <Route {...props} />;
  if (props.path) return <Redirect push to={`/login?from=${props.path}`} />;
  return <Redirect push to="/login" />;
}

export default ProtectedRoute;
