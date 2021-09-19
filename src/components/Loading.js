import { Container, Spinner } from "react-bootstrap";
import { ReactComponent as Image } from "../assets/waiting.svg";
import usePageTitle from "../hooks/usePageTitle";
import logger from "../utils/logger";

function Loading() {
  usePageTitle();
  logger.log("[Loading Placeholder]");

  return (
    <Container className="pt-4">
      <h3>
        Loading
        <Spinner className="ml-2" animation="grow" size="sm" />
        <Spinner className="ml-2" animation="grow" size="sm" />
        <Spinner className="ml-2" animation="grow" size="sm" />
      </h3>

      <Image className="w-100 h-auto" />
    </Container>
  );
}

export default Loading;
