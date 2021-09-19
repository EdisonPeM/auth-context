import { useContext } from "react";
import { AuthContext } from "../context/authCtx";

const useAuthCtx = () => useContext(AuthContext);
export default useAuthCtx;
