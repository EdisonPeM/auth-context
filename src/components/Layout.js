import logger from "../utils/logger";
import CustomNav from "./CustomNav";

function Layout({ children }) {
  logger.log("[Layout]");
  return (
    <div className="layout">
      <CustomNav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
