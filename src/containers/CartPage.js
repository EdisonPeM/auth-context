import { Container } from "react-bootstrap";
import { ReactComponent as Image } from "../assets/cart.svg";

import Loading from "../components/Loading";

import useFetchApi from "../hooks/useFetchApi";
import usePageTitle from "../hooks/usePageTitle";
import logger from "../utils/logger";

function CartPage() {
  usePageTitle("Cart");
  logger.log("[Cart]");

  const { data, loading } = useFetchApi();
  logger.log("[Cart] state:", data);

  if (loading) return <Loading />;
  return (
    <Container className="py-4">
      <h3 className="text-center">My Cart Page</h3>
      <Image className="w-100 h-auto" />
    </Container>
  );
}

export default CartPage;
