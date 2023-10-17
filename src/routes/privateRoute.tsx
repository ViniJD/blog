import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IUsuario } from "../interfaces/IUsuario";
import { useEffect, useState } from "react";
import { getItem } from "../services/localStorageService";

export default function privateRoute() {
  const location = useLocation();
  const [loggedUser, setLoggedUser] = useState<IUsuario>(getItem("loggedUser"));

  useEffect(() => {
    setLoggedUser(getItem("loggedUser"));
  }, [location]);

  return loggedUser ? <Outlet /> : <Navigate to="/" />;
}
