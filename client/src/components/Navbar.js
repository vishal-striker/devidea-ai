import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiZap, FiHome, FiGrid, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-primary-400 bg-primary-500/10' 
      : 'text-gray-400 hover:text-white hover:bg-dark-700';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <FiZap className="w-8 h-8 text-primary-400" />
              <div className="absolute inset-0 bg-primary-400/30 blur-xl group-hover:blur-2xl transition-all" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">DevIdea</span>
              <span className="text-white"> AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/')}`}
            >
              <FiHome className="w-5 h-5" />
              <span className="font-medium">Generator</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/dashboard')}`}
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="gradient-text bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-primary-500/25 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

