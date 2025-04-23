import { Link } from "react-router-dom";
import { FaClinicMedical, FaUserMd, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <Link
            to="/"
            className="flex items-center space-x-3 text-white hover:scale-105 transform transition-transform duration-300"
          >
            <FaClinicMedical className="text-2xl text-blue-200 drop-shadow-sm" />
            <span className="text-xl md:text-2xl font-bold tracking-wide">HealthHub</span>
          </Link>

          {/* Centered Tagline - Visible on desktop */}
          <span className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white drop-shadow-md tracking-wide">
            Your healthcare connection 💙
          </span>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <Link
              to="/clinics"
              className="flex items-center gap-2 hover:text-blue-200 hover:scale-105 transition-all duration-200"
            >
              <FaUserMd className="text-lg" />
              <span>Find Clinics</span>
            </Link>

            <Link
              to="/add-clinic"
              className="flex items-center gap-2 hover:text-blue-200 hover:scale-105 transition-all duration-200"
            >
              <FaUser className="text-lg" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-700 mt-2 rounded-lg shadow-lg text-center">
            {/* Centered Tagline in Mobile */}
            <div className="px-3 py-4 text-white text-lg font-semibold">
              Your healthcare connection 💙
            </div>
            
            <div className="px-2 pt-2 pb-4 space-y-2">
              <Link
                to="/clinics"
                className="block px-3 py-2 rounded-md text-white hover:bg-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center gap-3">
                  <FaUserMd className="text-lg" />
                  <span>Find Clinics</span>
                </div>
              </Link>
              
              <Link
                to="/add-clinic"
                className="block px-3 py-2 rounded-md text-white hover:bg-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center gap-3">
                  <FaUser className="text-lg" />
                  <span>Admin Portal</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;