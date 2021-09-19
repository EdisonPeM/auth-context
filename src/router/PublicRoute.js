import { Route } from "react-router-dom";
import logger from "../utils/logger";

function PublicRoute(props) {
  logger.log(`========== [PublicRoute: ${props.path}] ==========`);
  return <Route {...props} />;
}

export default PublicRoute;
