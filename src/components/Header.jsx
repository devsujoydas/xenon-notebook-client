import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-2 rounded bg-white active:scale-95 text-black font-medium hover:scale-105 transition-transform duration-200"
      : "px-3 py-2 rounded hover:bg-white hover:text-black active:scale-95 transition-all";

  return (
    <header className="bg-black text-white py-4 md:py-6 shadow-md">
      <div className="w-main mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="md:text-2xl text-xl font-semibold">
          Xenon Notebook
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 text-sm md:text-base">
          {user ? (
            <>
              <span className="mr-4 font-medium">Hi, {user.name}</span>
              <NavLink to="/note" className={linkClass}>
                All Notes
              </NavLink>
              <NavLink to="/new" className={linkClass}>
                New Note
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <button
                onClick={logout}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={linkClass}>
                Sign In
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-indigo-500 transition-all"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-zinc-200 rounded-md z-50"
              >
                <nav className="flex flex-col text-black p-2 space-y-2">
                  {user ? (
                    <>
                      <span className="px-3 py-2 font-medium border-b border-zinc-200">
                        Hi, {user.name}
                      </span>
                      <NavLink to="/note" className={linkClass}>
                        All Notes
                      </NavLink>
                      <NavLink to="/new" className={linkClass}>
                        New Note
                      </NavLink>
                      <NavLink to="/profile" className={linkClass}>
                        Profile
                      </NavLink>
                      <button
                        onClick={logout}
                        className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-all"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink to="/signin" className={linkClass}>
                        Sign In
                      </NavLink>
                      <NavLink to="/signup" className={linkClass}>
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
