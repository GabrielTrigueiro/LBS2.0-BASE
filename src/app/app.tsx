import { Routes, Route, Navigate } from "react-router-dom";

import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import ForgotPassword from "./views/login/forgotPassword/ForgotPassword";
import RedefinePassword from "./views/login/redefinePassword/redefinePassword";
import Login from "./views/login/login";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/esqueceuSenha" element={<ForgotPassword />} />
      <Route path="/recuperacao-senha" element={<RedefinePassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/clientes" element={<>clientes</>} />
        <Route path="/fornecedores" element={<>fornecedores</>} />
        <Route path="/indicacoes" element={<>indicacoes</>} />
        <Route path="/categorias" element={<>categorias</>} />
        <Route path="/produtos" element={<>produtos</>} />
        <Route path="/colaboradores" element={<>colaboradores</>} />
        <Route path="/venda" element={<>venda</>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
