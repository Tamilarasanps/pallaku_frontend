import { useState, useEffect } from "react";
import logo from "../assets/pallaku.png";

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
    <>
      {/* Spacer div to prevent content from hiding behind fixed header */}
      <div className="h-16 " style={{ zIndex: 999 }}></div>

      <div className="header-container fixed top-0 left-0 h-16 w-full z-50">
        <div className="fixed top-0 left-0 h-16 w-full  shadow-lg">
          {/* Top Navigation Bar */}
          <div className="h-full w-full absolute top-0 bg-[#ff1d58] text-white text-sm sm:text-xs flex justify-between items-center px-4 sm:px-6 md:px-8">
            {/* Logo */}
            <div className="h-full flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              <div className="h-full w-28 sm:w-24">
                <img
                  src={logo}
                  className="h-full w-full object-contain"
                  alt="Pallaku - Travel & Taxi Service Logo"
                />
              </div>
              <h4 className="font-bold text-sm md:text-base whitespace-nowrap">
                Your Journey, Our Care
              </h4>
            </div>

            {/* Desktop Nav Links */}

            {/* Contact Info for Desktop */}
            <div className="hidden lg:flex items-center text-xs">
              <nav className="hidden md:flex gap-6 flex-1 justify-center text-sm md:text-base lg:text-lg">
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
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                    {activeSection === item.href.substring(1) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></span>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Hamburger for Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none p-2 hover:bg-red-600 rounded transition-colors duration-200"
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={menuOpen}
              >
                <svg
                  className="w-6 h-6 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
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
              className="absolute top-16 w-full 
                  bg-gradient-to-b from-[#ff1d58] via-[#ff1d58]/95 to-[#ff1d58]/85
                  backdrop-blur-md text-white flex flex-col items-center py-6 md:hidden z-50 space-y-4 text-base
                  border-t border-red-400/30 shadow-xl z-[9999]"
              role="menu"
              aria-label="Mobile navigation menu"
              style={{ zIndex: 9999 }}
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`hover:text-yellow-300 transition-colors duration-200 py-2 px-4 rounded w-full text-center ${
                    activeSection === item.href.substring(1)
                      ? "text-yellow-300 font-semibold bg-red-600/30"
                      : "hover:bg-red-600/20"
                  }`}
                  role="menuitem"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.3s ease-out forwards",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

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
    </>
  );
};

export default Header;
