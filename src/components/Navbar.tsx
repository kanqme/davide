import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { title: "Home", targetId: "home" },
  { title: "Projects", targetId: "projects" },
  { title: "About", targetId: "about" },
  { title: "Contact", targetId: "contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (targetId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      scrollToSection(targetId);
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-100 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-accent-purple">
          Ajazi
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavClick(item.targetId)}
              className="text-white hover:text-accent-blue transition"
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-200 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavClick(item.targetId)}
              className="block w-full text-left text-white hover:text-accent-blue transition"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
