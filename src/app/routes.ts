import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Products } from "./components/Products";
import { Batches } from "./components/Batches";
import { Alerts } from "./components/Alerts";
import { Customers } from "./components/Customers";
import { Reports } from "./components/Reports";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "produtos", Component: Products },
      { path: "lotes", Component: Batches },
      { path: "alertas", Component: Alerts },
      { path: "clientes", Component: Customers },
      { path: "relatorios", Component: Reports },
    ],
  },
]);
