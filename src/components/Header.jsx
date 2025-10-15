import { useState, useEffect } from "react";
// import logo from "../assets/pallaku.png";
import logo from "../assets/OPEN-2.png";

import { FaBars, FaTimes } from "react-icons/fa";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".header-container")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle smooth scrolling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["booking", "tariffs", "about"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navItems = [
    { href: "#booking", label: "Booking" },
    { href: "#tariffs", label: "Tariffs" },
    { href: "#about", label: "About Us" },
  ];
  // ok
  const handleNavClick = (href, event) => {
    event.preventDefault();
    setMenuOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-16 bg-red-200 header-container fixed top-0 left-0 w-full z-50">
      <div className="h-16 w-full shadow-lg bg-[#ff1d58] text-white flex items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <div className="h-24 w-48 sm:w-40">
            <img
              src={logo}
              className="h-full w-full object-contain"
              alt="Pallaku Logo"
            />
          </div>

          <h4 className="font-bold text-sm md:text-base whitespace-nowrap">
            Your Journey, Our Care
          </h4>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm md:text-base lg:text-lg">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              className={`hover:text-yellow-300 transition-colors duration-200 relative py-2 px-3 rounded ${
                activeSection === item.href.substring(1)
                  ? "text-yellow-300 font-semibold"
                  : "hover:underline"
              }`}
            >
              {item.label}
              {activeSection === item.href.substring(1) && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2 hover:bg-red-600 rounded"
          >
            {/* SVG Icon */}
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#ff1d58] text-white flex flex-col items-center py-6 md:hidden z-50 space-y-4 text-base">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              className={`hover:text-yellow-300 py-2 px-4 w-full text-center ${
                activeSection === item.href.substring(1)
                  ? "text-yellow-300 font-semibold bg-red-600/30"
                  : "hover:bg-red-600/20"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
