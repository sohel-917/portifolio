import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Terminal, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Contact", path: "/contact" },
  ];

  const adminToken = localStorage.getItem("adminToken");

  return (
    <nav id="navbar-main" className="sticky top-0 z-50 transition-colors duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-150 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight block">
                  Shaik Sohel
                </span>
                <span className="text-xs font-mono text-sky-600 dark:text-sky-400 block -mt-0.5 font-medium">
                  AI Engineer
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-sky-600 dark:bg-sky-450 rounded" />
                  )}
                </Link>
              );
            })}

            {/* Separator */}
            <span className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

            {/* Admin Dashboard Page Link indicator */}
            <Link
              to="/admin"
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                location.pathname.startsWith("/admin")
                  ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/20 dark:text-sky-455 dark:border-sky-800"
                  : adminToken
                  ? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-sky-50/50 hover:text-sky-650"
                  : "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 hover:bg-sky-50/50 hover:text-sky-600 hover:border-sky-200"
              }`}
            >
              <Shield className="h-3 w-3" />
              <span>{adminToken ? "Admin Console" : "Admin"}</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
               id="theme-toggler-btn"
               onClick={() => setDarkMode(!darkMode)}
               className="p-2 ml-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
               aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Menu & Dark Mode Panel */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-base font-medium ${
                  isActive
                    ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2" />
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium ${
              location.pathname.startsWith("/admin")
                ? "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/20"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Admin Console</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
