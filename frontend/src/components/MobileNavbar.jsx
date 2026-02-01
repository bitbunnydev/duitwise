import React from "react";
import { Home, BarChart2, Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const MobileNavbar = ({ total, onAddClick, activeTab = "home" }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-gray-100 px-8 py-3 pb-10 md:hidden z-40">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        {/* Home Tab */}
        <button
          className={`flex flex-col items-center gap-1.5 flex-1 transition-all active:scale-90 ${
            activeTab === "home" ? "text-primary" : "text-gray-300"
          }`}
        >
          <Home size={24} strokeWidth={activeTab === "home" ? 2.5 : 2} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Home
          </span>
        </button>

        {/* Center Section: Floating Total & Action */}
        <div className="flex-1 flex flex-col items-center relative">
          {/* Cute Bubble for Total */}
          <div className="absolute -top-20 bg-white border-2 border-primary-soft px-4 py-1.5 rounded-full shadow-cute whitespace-nowrap animate-bounce-subtle">
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
          {/* Spacer to keep nav height consistent */}
          <div className="h-12" />
        </div>

        {/* Analytic Tab */}
        <button
          className={`flex flex-col items-center gap-1.5 flex-1 transition-all active:scale-90 ${
            activeTab === "analytics" ? "text-primary" : "text-gray-300"
          }`}
        >
          <BarChart2
            size={24}
            strokeWidth={activeTab === "analytics" ? 2.5 : 2}
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Stats
          </span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
