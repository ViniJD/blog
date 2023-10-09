import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IRoute {
  label: string;
  route: string;
}

export default function Navbar() {
  const [routesToHideMenu] = useState<string[]>(["/login", "/cadastrar"]);
  const [activeRoute, setActiveRoute] = useState<string>("");
  const location = useLocation();
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

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary border-bottom border-top-0 border-warning border-2 border-opacity-50 ${
        routesToHideMenu.includes(activeRoute) && "d-none"
      }`}
    >
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fw-bold fs-2 text-warning" to="/">
            News.blog
          </Link>

          <ul className="navbar-nav">
            {routes.map(({ route, label }, index) => (
              <li className="nav-item">
                <Link
                  key={index}
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
          <Link
            className="text-warning text-decoration-none me-3"
            to="/cadastrar"
          >
            Cadastre-se
          </Link>
          <Link className="btn btn-outline-warning" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
