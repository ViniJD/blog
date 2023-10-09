import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function privateRoute() {
  const [loggedUser] = useLocalStorage("loggedUser");
  console.log(loggedUser);

  return loggedUser ? <Outlet /> : <Navigate to="/" />;
}
