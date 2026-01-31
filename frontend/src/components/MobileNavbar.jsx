import React from "react";
import { Home, BarChart2, Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const MobileNavbar = ({ total, onAddClick, activeTab = "home" }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 px-6 py-2 pb-8 md:hidden z-40">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        {/* Home Tab */}
        <button
          className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === "home" ? "text-orange-500" : "text-gray-400"}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Home
          </span>
        </button>

        {/* Floating Plus & Total Display */}
        <div className="flex-1 flex flex-col items-center relative">
          <div className="absolute -top-16 bg-white border border-orange-100 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
            <span className="text-[9px] uppercase font-bold text-gray-400 mr-1">
              Total:
            </span>
            <span className="text-sm font-black text-gray-800">
              {formatCurrency(total)}
            </span>
          </div>

          <div className="absolute -top-10">
            <button
              onClick={onAddClick}
              className="bg-linear-to-tr from-orange-400 to-pink-500 text-white p-4 rounded-full shadow-xl shadow-orange-500/40 transform active:scale-90 transition-all border-[6px] border-white"
            >
              <Plus size={28} strokeWidth={3} />
            </button>
          </div>
          <div className="h-10" />
        </div>

        {/* Analytic Tab */}
        <button
          className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === "analytics" ? "text-orange-500" : "text-gray-400"}`}
        >
          <BarChart2 size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Analytic
          </span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
