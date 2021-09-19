import { Card, Container, Button } from "react-bootstrap";
import useAuthCtx from "../hooks/useAuthCtx";
import usePageTitle from "../hooks/usePageTitle";
import logger from "../utils/logger";

function Profile() {
  usePageTitle("Profile");
  logger.log("[Profile]");

  const { userData, logout } = useAuthCtx();

  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card className="w-75">
        <Card.Img variant="top" src={userData.image} alt="profile Image" />
        <Card.Body>
          <Card.Title>
            {userData.name} {userData.lastName}
            <br />
            <small>
              {userData.birth.toLocaleString("en", { dateStyle: "long" })}
            </small>
          </Card.Title>
          <Card.Text className="font-weight-bold">{userData.email}</Card.Text>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Text className="text-right">
            <Button onClick={logout} variant="link">
              Logout
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
