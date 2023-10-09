import { Route, Routes } from "react-router-dom";

import Cadastrar from "../pages/Cadastrar";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./privateRoute";
import Postagens from "../pages/Postagens";
import MostrarPostagem from "../pages/MostrarPostagem";

export default function RoutesIndex() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/postagens" element={<Postagens />} />
      <Route path="/postagens/:id" element={<MostrarPostagem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Cadastrar />} />
    </Routes>
  );
}
