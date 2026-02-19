import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Plus, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const DesktopNavbar = ({ total, onAddClick }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 font-bold transition hover:opacity-80 active:scale-95 ${
      isActive ? "text-primary" : "text-gray-400"
    }`;

  return (
    <header className="hidden md:flex sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto w-full px-8 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <Wallet className="text-primary" />
          <span className="text-xl font-black">DuitWise</span>
        </NavLink>

        <nav className="flex items-center gap-10">
          <NavLink to="/" className={navLinkClass}>
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/analytics" className={navLinkClass}>
            <BarChart2 size={20} /> Analytics
          </NavLink>
        </nav>

        <div className="flex items-center gap-6">
          <div className="bg-primary-soft px-4 py-2 rounded-full">
            <span className="text-xs font-black text-gray-400 mr-2">Total</span>
            <span className="font-black text-primary">
              {formatCurrency(total)}
            </span>
          </div>
          <button
            onClick={onAddClick} // <--- THIS TRIGGERS THE MODAL
            className="bg-primary text-white p-3 rounded-full shadow-md hover:shadow-lg active:scale-90 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbar;
