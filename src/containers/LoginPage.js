import { memo, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";

import useAuthCtx from "../hooks/useAuthCtx";
import usePageTitle from "../hooks/usePageTitle";
import useSearchParams from "../hooks/useSearchParams";
import logger from "../utils/logger";

function LoginPage() {
  usePageTitle("Login");

  const history = useHistory();
  const searchParams = useSearchParams();
  const { loadingAuth, isAuth, login } = useAuthCtx();
  const [formData, setFormData] = useState({
    email: "correo@example.com",
    password: "somePassword"
  });

  // If the user is logged, redirect to Home
  logger.log("[LoginPage] loadingAuth:", loadingAuth);
  useEffect(() => {
    logger.log("[LoginPage] isAuth:", isAuth);
    logger.log("[LoginPage] history lenght:", history.length);
    logger.log("[LoginPage] searchParams:", searchParams);

    if (isAuth) history.push(searchParams.from || "/");
    // innecesary History and SearchParams deps ?
  }, [isAuth, history, searchParams]);

  // Avoid render full login content
  if (loadingAuth) return <Loading />;
  if (isAuth) return null;

  // Handlers
  const handleInput = (name) => ({ target: { value } }) =>
    setFormData((s) => ({ ...s, [name]: value }));
  const handleSubmit = (ev) => {
    ev.preventDefault();
    login(formData);
  };

  return (
    <Container className="p-5">
      <div className="border p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@correo.com"
              value={formData["email"]}
              onChange={handleInput("email")}
              required={false}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Some Password"
              value={formData["password"]}
              onChange={handleInput("password")}
              required={false}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default memo(LoginPage);
