import { Container } from "react-bootstrap";
import { ReactComponent as Image } from "../assets/people.svg";
import usePageTitle from "../hooks/usePageTitle";
import logger from "../utils/logger";

function HomePage() {
  usePageTitle("Home");
  logger.log("[HomePage]");

  return (
    <Container className="pt-4">
      <h1>Happy Code</h1>
      <Image className="w-100 h-auto" />
    </Container>
  );
}

export default HomePage;
