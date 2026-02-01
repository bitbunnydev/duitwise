import React from "react";
import {
  X,
  Sparkles,
  Banknote,
  Tag,
  MessageSquare,
  Calendar,
} from "lucide-react";

const ExpenseForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  setIsFormOpen,
  isMobile,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-pop">
      {/* Header for Mobile Popups */}
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-secondary animate-pulse" size={20} />
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              New Spend!
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="p-3 bg-gray-100 text-gray-400 rounded-full active:scale-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">
          <Banknote size={14} /> How much?
        </label>
        <div className="relative group">
          <input
            name="expenseAmount"
            type="number"
            placeholder="0.00"
            value={formData.expenseAmount}
            onChange={handleInputChange}
            className="w-full p-5 rounded-cute bg-primary-soft border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-black text-2xl text-primary placeholder:text-primary/30 shadow-xs group-hover:shadow-md"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-primary/50 text-sm">
            MYR
          </span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">
          <Tag size={14} /> Category
        </label>
        <div className="relative">
          <select
            name="expenseCategory"
            value={formData.expenseCategory}
            onChange={handleInputChange}
            className="w-full p-4 rounded-cute bg-gray-50 border-2 border-transparent focus:border-primary outline-none appearance-none cursor-pointer font-bold text-gray-700 transition-all hover:bg-gray-100"
          >
            <option value="Food">🍔 Food & Dining</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Utilities">💡 Utilities</option>
            <option value="Entertainment">🎬 Entertainment</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">
          <MessageSquare size={14} /> Description
        </label>
        <input
          name="expenseDesc"
          type="text"
          placeholder="Treat yourself! ✨"
          value={formData.expenseDesc}
          onChange={handleInputChange}
          className="w-full p-4 rounded-cute bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium"
        />
      </div>

      {/* Date Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">
          <Calendar size={14} /> When?
        </label>
        <input
          name="expenseDate"
          type="date"
          value={formData.expenseDate}
          onChange={handleInputChange}
          className="w-full p-4 rounded-cute bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-gray-600"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white font-black py-5 rounded-cute shadow-cute hover:bg-indigo-600 active:scale-95 active:rotate-1 transition-all flex items-center justify-center gap-2 group"
      >
        <span>Add to DuitWise</span>
        <Sparkles
          size={18}
          className="group-hover:rotate-12 transition-transform"
        />
      </button>
    </form>
  );
};

export default ExpenseForm;
