import { Route, Routes, useLocation } from "react-router-dom";

import Cadastrar from "../pages/Cadastrar";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./privateRoute";
import Postagens from "../pages/Postagens";
import MostrarPostagem from "../pages/MostrarPostagem";
import PostagensDoUsuarios from "../pages/PostagensDoUsuario";
import Sobre from "../pages/Sobre";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function RoutesIndex() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <h1>teste</h1>
            </Sidebar>
          }
        />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/postagens" element={<Postagens />} />
      <Route path="/postagens/:id" element={<MostrarPostagem />} />
      <Route path="/postagens/usuario/:id" element={<PostagensDoUsuarios />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
    </Routes>
  );
}
