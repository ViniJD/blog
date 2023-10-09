import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: IProps) {
  const [routesToHideMenu] = useState<string[]>(["/dashboard"]);
  const [activeRoute, setActiveRoute] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  return (
    <div
      className={`container-fluid ${
        routesToHideMenu.some((route) => activeRoute.includes(route))
          ? ""
          : "d-none"
      }`}
    >
      <div className="row flex-nowrap">
        <div className="col-2 bg-body-tertiary border-end border-warning border-2 border-opacity-50 vh-100">
          <div className="d-flex flex-column p-3 h-100">
            <div className="text-center w-100">
              <Link
                to="/"
                className="fw-bold fs-2 text-warning text-decoration-none"
              >
                News.blog
              </Link>
            </div>
            <ul className="nav nav-pills flex-column h-100">
              <li className="nav-item">
                <Link to="#" className="nav-link link-body-emphasis fw-bold">
                  Minhas postagens
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link link-body-emphasis">
                  Nova postagem
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link link-body-emphasis">
                  Meus dados
                </Link>
              </li>
              <li className="mt-auto border-top pt-2">
                <button className="nav-link link-body-emphasis">
                  <i className="fa-solid fa-right-from-bracket me-2"></i> Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-10 p-5 overflow-auto vh-100">{children}</div>
      </div>
    </div>
  );
}
