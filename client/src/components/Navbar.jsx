import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiBriefcase, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                SkillBridge
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block truncate max-w-[150px]">{user.name}</span>
                  <span className="hidden sm:inline-block px-2 py-1 text-xs rounded border border-slate-200 bg-slate-50 text-slate-500 capitalize">
                      {user.role}
                  </span>
                </div>
                {user.role === 'student' && (
                  <Link
                    to="/student-dashboard"
                    className="text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-md font-medium transition flex items-center gap-2"
                  >
                   <FiUser /> Dashboard
                  </Link>
                )}
                {user.role === 'company' && (
                  <Link
                    to="/company-dashboard"
                    className="text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-md font-medium transition flex items-center gap-2"
                  >
                   <FiBriefcase /> Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 px-3 py-2 rounded-md font-medium transition flex items-center gap-2"
                >
                  <FiLogOut /> <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign up
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