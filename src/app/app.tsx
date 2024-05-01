import { Routes, Route, Navigate } from "react-router-dom";

import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import Login from "app/views/login/login";
import Sales from "app/views/sales/sales";
import RegisterSeller from "./views/registerSeller/registerSeller";
import EditUser from "./views/editUser/editUser";
import SellerList from "./views/sellerList/sellerList";
import Classes from "./views/courses/courses";
import Indications from "./views/indications/indicationList";
import RegisterIndication from "./views/registerIndication/registerIndication";
import Financial from "./views/financial/financial";
import ClientPayment from "./views/dashboard/client/clientDashboard";
import Dashboard from "./views/dashboard/default/dashboard";
import Campaign from "./views/campaign/Campaign";
import Cupons from "./views/coupons/coupons";
import { SaleFormProvider } from "core/context/SaleContext";
import NameCleanerDois from "./views/nameCleaner/nameCleanerDois";
import RegisterCoupon from "./views/registerCoupon/RegisterCoupon";
import RegisterCampaign from "./views/registerCampaign/RegisterCampaign";
import ForgotPassword from "./views/login/forgotPassword/ForgotPassword";
import RedefinePassword from "./views/login/redefinePassword/redefinePassword";
import Contract from "./views/contract/contract";
import Links from "./views/links/Links";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/esqueceuSenha" element={<ForgotPassword />} />
      <Route path="/recuperacao-senha" element={<RedefinePassword />} />

      <Route
        path="/limpanome/:id"
        element={
          <SaleFormProvider>
            <NameCleanerDois />
          </SaleFormProvider>
        }
      />
      <Route
        path="/consultoria/:id"
        element={
          <SaleFormProvider>
            <NameCleanerDois />
          </SaleFormProvider>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/cadastroIndicacao" element={<RegisterIndication />} />
        <Route path="/cadastroVendedor" element={<RegisterSeller />} />
        <Route path="/cadastroCoupon" element={<RegisterCoupon />} />
        <Route path="/cadastroCampanha" element={<RegisterCampaign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagamentos" element={<ClientPayment />} />
        <Route path="/links" element={<Links />} />
        <Route path="/contrato" element={<Contract />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/editarUsuario" element={<EditUser />} />
        <Route path="/vendedores" element={<SellerList />} />
        <Route path="/aulas" element={<Classes />} />
        <Route path="/indicacoes" element={<Indications />} />
        <Route path="/financeiro" element={<Financial />} />
        <Route path="/campanhas" element={<Campaign />} />
        <Route path="cupons" element={<Cupons />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
