import { Switch } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/PublicRoute";
import ROUTES from "./router/routes";

import Layout from "./components/Layout";
import logger from "./utils/logger";

function App() {
  logger.log("[App]");
  return (
    <Layout>
      <Switch>
        {ROUTES.map(({ component, path, isPrivate }) => {
          if (isPrivate)
            return (
              <ProtectedRoute
                key={path}
                path={path}
                exact
                component={component}
              />
            );

          return (
            <PublicRoute
              key={path || "404"}
              path={path}
              exact
              component={component}
            />
          );
        })}
      </Switch>
    </Layout>
  );
}

export default App;
