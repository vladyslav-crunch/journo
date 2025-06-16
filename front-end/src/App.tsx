// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EntryDetail from "./pages/EntryDetail";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={2000}
        position="bottom-left"
        style={{
          margin: window.innerWidth < 640 ? "16px" : "10px",
          width: window.innerWidth < 640 ? "90vw" : "300px",
        }}
      />

      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="entries/:id" element={<EntryDetail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
