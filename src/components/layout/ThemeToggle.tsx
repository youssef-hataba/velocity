import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      root.style.colorScheme = "light";
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 rounded-full bg-surface border border-steel/20 p-1 flex items-center cursor-pointer overflow-hidden shadow-inner focus:outline-none"
    >
      <motion.div
        animate={{ 
          x: isDark ? 24 : 0,
          backgroundColor: isDark ? "#3b82f6" : "#f59e0b" 
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full flex items-center justify-center text-white z-10 shadow-md"
      >
        {isDark ? (
          <Moon size={12} fill="currentColor" className="text-white" />
        ) : (
          <Sun size={12} fill="currentColor" className="text-white" />
        )}
      </motion.div>
      
      <div className="absolute inset-0 bg-linear-to-r from-amber-500/5 to-blue-500/5 opacity-50" />
    </button>
  );
};