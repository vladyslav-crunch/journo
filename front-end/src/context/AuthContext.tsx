import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../api/auth";
import { type ReactNode } from "react";
import { setLogout } from "../utils/logoutHelper";
type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (newToken: string) => {
    setToken(newToken);
    navigate("/");
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;

      try {
        await validateToken(token);
      } catch {
        logout();
      }
    };

    checkToken();
  }, [token]);

  useEffect(() => {
    setLogout(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
