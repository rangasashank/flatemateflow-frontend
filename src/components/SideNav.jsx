import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SignOutNav from "./SignOutNav";
import { useEffect, useRef } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (
        (prevWidth.current < 1024 && currentWidth >= 1024) ||
        (prevWidth.current >= 1024 && currentWidth < 1024)
      ) {
        setIsOpen(currentWidth >= 1024);
      }
      prevWidth.current = currentWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Header for Mobile */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 p-4 lg:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-700">Flatmate Flow</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-64 bg-white shadow-lg">
        {/* Sidebar Header (Always Visible) */}
        <div className="hidden lg:block p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-700">Flatmate Flow</h1>
        </div>

        {/* Sidebar for Mobile */}
        <motion.nav
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform lg:translate-x-0 lg:relative lg:w-64 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          initial={{ x: -200 }}
          animate={{ x: isOpen ? 0 : -200 }}
          transition={{ duration: 0.6 }}
        >
          {/* Sidebar Content */}
          <div className="h-full flex flex-col pt-20 lg:pt-6 px-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/mainpage"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/expenses"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Expenses
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
              </li>
              <li>
                <SignOutNav />
              </li>
            </ul>
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default SideNav;
