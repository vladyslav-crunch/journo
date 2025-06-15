import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../api/journal";
import { type ReactNode } from "react";
type AuthContextType = {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (newToken: string) => {
    setToken(newToken);
    navigate("/");
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;

      try {
        const userData = await validateToken(token);
        setUser(userData);
      } catch {
        logout();
      }
    };

    checkToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // ✅ export this
