import { Routes, Route, Navigate } from "react-router-dom";

import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import ForgotPassword from "./views/login/forgotPassword/ForgotPassword";
import RedefinePassword from "./views/login/redefinePassword/redefinePassword";
import Login from "./views/login/login";
import Client from "./views/client/client";
import Colaborator from "./views/colaborator/colaborator";
import Indication from "./views/indication/indication";
import Provider from "./views/provider/provider";
import Product from "./views/product/product";
import RegisterProduct from "./views/registers/product/registerProduct";
import Category from "./views/category/category";
import RegisterIndication from "./views/registerIndication/registerIndication";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/esqueceuSenha" element={<ForgotPassword />} />
      <Route path="/recuperacao-senha" element={<RedefinePassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/clientes" element={<Client />} />
        <Route path="/fornecedores" element={<Provider />} />
        <Route path="/indicacoes" element={<Indication />} />
        <Route path="/categorias" element={<Category />} />
        <Route path="/produtos" element={<Product />} />
        <Route path="/colaboradores" element={<Colaborator />} />
        <Route path="/venda" element={<>venda</>} />
        <Route path="/registrarIndicacao" element={<RegisterIndication />} />
        <Route path="/registrarProduto" element={<RegisterProduct />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
