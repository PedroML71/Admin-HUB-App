import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Root, NoAuth, RequireAuth } from "./layout";
import {
  HomePage,
  AdminsPage,
  FuncionariosPage,
  MedicosPage,
  UnidadesPage,
  ErrorPage,
  LoginPage,
  PacientesPage,
  ResetPage,
} from "./pages";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Root />
      </App>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth allowedRoles={["Admin", "Funcionario", "Medico"]}>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/admins",
        element: (
          <RequireAuth allowedRoles={["Admin"]}>
            <AdminsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/funcionarios",
        element: (
          <RequireAuth allowedRoles={["Admin", "Funcionario"]}>
            <FuncionariosPage />
          </RequireAuth>
        ),
      },
      {
        path: "/medicos",
        element: (
          <RequireAuth allowedRoles={["Admin", "Funcionario"]}>
            <MedicosPage />
          </RequireAuth>
        ),
      },
      {
        path: "/unidades",
        element: (
          <RequireAuth allowedRoles={["Admin"]}>
            <UnidadesPage />
          </RequireAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <NoAuth>
            <LoginPage />
          </NoAuth>
        ),
      },
      {
        path: "/pacientes",
        element: (
          <RequireAuth allowedRoles={["Medico"]}>
            <PacientesPage />
          </RequireAuth>
        ),
      },
      {
        path: "/reset",
        element: (
          <NoAuth>
            <ResetPage />
          </NoAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
