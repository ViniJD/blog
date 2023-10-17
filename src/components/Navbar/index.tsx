import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IRoute } from "../../interfaces/IRoutes";
import { getItem, removeItem } from "../../services/localStorageService";
import { IUsuario } from "../../interfaces/IUsuario";

export default function Navbar() {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [loggedUser, setLoggedUser] = useState<IUsuario>();
  const location = useLocation();
  const [routesToHideMenu] = useState<string[]>([
    "/login",
    "/cadastrar",
    "/dashboard",
  ]);
  const [routes] = useState<IRoute[]>([
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Postagens",
      route: "/postagens",
    },
    {
      label: "Sobre",
      route: "/sobre",
    },
  ]);

  const signout = useCallback(() => {
    removeItem("loggedUser");
    setLoggedUser(undefined);
  }, [loggedUser]);

  useEffect(() => {
    setActiveRoute(location.pathname);
    setLoggedUser(getItem("loggedUser"));
  }, [location]);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary border-bottom border-top-0 border-warning border-2 border-opacity-50 ${
        routesToHideMenu.some((route) => activeRoute.includes(route)) &&
        "d-none"
      }`}
    >
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fw-bold fs-2 text-warning" to="/">
            News.blog
          </Link>

          <ul className="navbar-nav">
            {routes.map(({ route, label }, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link text-dark ${
                    activeRoute === route && "fw-bold"
                  }`}
                  to={route}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {!loggedUser ? (
            <>
              <Link
                className="text-dark text-decoration-none me-3"
                to="/cadastrar"
              >
                Cadastre-se
              </Link>
              <Link className="btn btn-warning" to="/login">
                Login
              </Link>
            </>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Conta
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="fa-regular fa-user me-2"></i> Perfil
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={signout}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      Sair
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
