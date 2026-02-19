import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const MobileNavbar = ({ total, onAddClick }) => {
  // Handle active styling logic
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1.5 flex-1 transition-all active:scale-90 ${
      isActive ? "text-primary" : "text-gray-300"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-3 pb-10 md:hidden z-40">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        {/* Home Tab */}
        <NavLink to="/" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Home size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Center Section */}
        <div className="flex-1 flex flex-col items-center relative">
          {/* Total Bubble */}
          <div className="absolute -top-20 bg-white border-2 border-primary-soft px-4 py-1.5 rounded-full shadow-lg shadow-black/5 whitespace-nowrap animate-bounce-subtle">
            <span className="text-[9px] uppercase font-black text-gray-400 mr-1.5">
              Total:
            </span>
            <span className="text-sm font-black text-primary">
              {formatCurrency(total)}
            </span>
          </div>

          {/* Large Plus Button */}
          <div className="absolute -top-12">
            <button
              onClick={onAddClick}
              className="bg-linear-to-br from-primary to-secondary text-white p-5 rounded-full shadow-lg shadow-primary/30 transform active:scale-75 active:rotate-12 transition-all border-8 border-white"
            >
              <Plus size={32} strokeWidth={4} />
            </button>
          </div>
          {/* Spacer to keep layout balanced */}
          <div className="h-12" />
        </div>

        {/* Analytic Tab */}
        <NavLink to="/analytics" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <BarChart2 size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Stats
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNavbar;
