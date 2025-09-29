import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // pega o token do localStorage
  const token = localStorage.getItem("token");

  if (!token) {

 return <Navigate to="/login" replace />;

  }
  return <Outlet />;
}
