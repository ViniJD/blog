import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Cadastrar from "../pages/Cadastrar";
import Home from "../pages/Home";
import Login from "../pages/Login";

import PrivateRoute from "./privateRoute";
import Postagens from "../pages/Postagens";
import MostrarPostagem from "../pages/MostrarPostagem";
import PostagensDoUsuarios from "../pages/PostagensDoUsuario";
import Sobre from "../pages/Sobre";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MinhasPostagens from "../pages/Dashboard/MinhasPostagens";
import NovaPostagem from "../pages/Dashboard/NovaPostagem";
import MeusDados from "../pages/Dashboard/MeusDados";
import MeusComentarios from "../pages/Dashboard/MeusComentarios";
import PostagensCurtidas from "../pages/Dashboard/PostagensCurtidas";

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
          element={<Navigate to="/dashboard/postagens" />}
        />
        <Route
          path="/dashboard/postagens"
          element={
            <Sidebar>
              <MinhasPostagens />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/postagens/nova"
          element={
            <Sidebar>
              <NovaPostagem />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/postagens/:id/editar"
          element={
            <Sidebar>
              <h1>editar</h1>
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/comentarios"
          element={
            <Sidebar>
              <MeusComentarios />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/postagenscurtidas"
          element={
            <Sidebar>
              <PostagensCurtidas />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/meusdados"
          element={
            <Sidebar>
              <MeusDados />
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
