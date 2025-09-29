import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Contato from "./pages/Contato/index.tsx";
import SobreNos from "./pages/Quem somos";
import Planos from "./pages/Planos/index.tsx";
import Login from "./pages/Login";
import Dashboard from "./pages/auth/Dashboard/index.tsx";
import Reports from "./pages/auth/Reports";
import Transactions from "./pages/auth/Transactions/index.tsx";
import Profile from "./pages/auth/Profile/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register/index.tsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

// Tema removido a pedido: sem inicialização de tema aqui

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sobre-nos", element: <SobreNos /> },
  { path: "/planos", element: <Planos /> },
  { path: "/contato", element: <Contato /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/auth/dashboard", element: <Dashboard /> },
      { path: "/auth/transactions", element: <Transactions /> },
      { path: "/auth/reports", element: <Reports /> },
      { path: "/auth/profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
