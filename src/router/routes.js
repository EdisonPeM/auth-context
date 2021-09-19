import HomePage from "../containers/HomePage";
import SomePage from "../containers/SomePage";
import CartPage from "../containers/CartPage";
import Profile from "../containers/Profile";
import LoginPage from "../containers/LoginPage";
import { Redirect } from "react-router-dom";

const ROUTES = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/other",
    label: "Some other Page",
    component: SomePage
  },
  {
    path: "/cart",
    label: "My Cart",
    component: CartPage,
    isPrivate: true
  },
  {
    path: "/me",
    component: Profile,
    isPrivate: true
  },
  {
    // Page 404
    component: () => <Redirect to="/" />
  }
];

export default ROUTES;
