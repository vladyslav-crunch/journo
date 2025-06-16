import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm shadow px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          Journo
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-600 px-4 py-1.5 rounded hover:bg-red-200 transition text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
