import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { type JSX } from "react";
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
