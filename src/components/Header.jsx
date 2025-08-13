import { useState } from "react";
// import headerBanner from "./assets/banner.jpeg";
// import logo from "./assets/logo__1.png";
import logo from "../assets/pallaku.png"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className=" p-3 ">
      <div className="fixed top-0 left-0 h-16 w-full z-[9999]">
        {/* Top Navigation Bar */}
        <div className="h-full w-full absolute top-0 bg-[#ff1d58] text-white text-sm sm:text-xs flex justify-between items-center px-4 sm:px-6 md:px-1">
          {/* Logo */}
          <div className="h-full w-28 sm:w-24">
            <img src={logo} className="h-full w-full object-contain" alt="Logo" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 flex-1 justify-around text-sm md:text-base lg:text-lg">
            <a href="#booking" className="hover:underline">
              Booking
            </a>
            <a href="#tarrifs" className="hover:underline">
              Tarrifs
            </a>
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#vehicles" className="hover:underline">
              Vehicles
            </a>
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden mr-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            className="absolute top-20 w-full 
                bg-gradient-to-b from-[#ff1d58] via-[#ff1d58]/80 to-[#ff1d58]/40
                backdrop-blur-md text-white flex flex-col items-center py-4 md:hidden z-50 space-y-4 text-sm"
          >
            <a href="#booking" onClick={() => setMenuOpen(false)}>
              Booking
            </a>
            <a href="#tarrifs" onClick={() => setMenuOpen(false)}>
              Tarrifs
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="#vehicles" onClick={() => setMenuOpen(false)}>
              Vehicles
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
