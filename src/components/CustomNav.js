import useAuthCtx from "../hooks/useAuthCtx";

import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";

import ROUTES from "../router/routes";
import logger from "../utils/logger";

function NavLinks() {
  const { isAuth, userData } = useAuthCtx();

  logger.log("[NavLinks] isAuth:", isAuth);
  return (
    <Nav className="ml-auto">
      {ROUTES.map(({ label, path, isPrivate }) => {
        if (!label || (isPrivate && !isAuth)) return null;
        return (
          <Nav.Link key={path} exact as={NavLink} to={path}>
            {label}
          </Nav.Link>
        );
      })}
      {!isAuth ? (
        <Nav.Link exact as={NavLink} to="/login">
          login
        </Nav.Link>
      ) : (
        userData && (
          <Link to="/me">
            <Image
              style={{
                marginLeft: "10px",
                height: "2.5rem"
              }}
              src={userData.image}
              roundedCircle
            />
          </Link>
        )
      )}
    </Nav>
  );
}

function CustomNav() {
  logger.log("[Nav]");
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavLinks />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNav;
