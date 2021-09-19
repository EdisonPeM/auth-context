import { Container } from "react-bootstrap";
import { ReactComponent as Image } from "../assets/other.svg";
import usePageTitle from "../hooks/usePageTitle";
import logger from "../utils/logger";

function SomePage() {
  usePageTitle("Some Othet Page");
  logger.log("[Some Page]");

  return (
    <Container className="pt-4">
      <h1>Some Other Page</h1>
      <Image className="w-100 h-auto" />
    </Container>
  );
}

export default SomePage;
