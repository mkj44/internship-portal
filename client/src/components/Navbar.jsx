import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase, User as UserIcon, LayoutDashboard, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-700 to-indigo-700 text-transparent bg-clip-text tracking-tight group-hover:from-blue-600 group-hover:to-indigo-500 transition-all duration-300">
                SkillBridge
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2 md:space-x-6">
            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{user.role}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm ring-2 ring-indigo-50 mr-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>

                {user.role === 'student' && (
                  <Link
                    to="/student-dashboard"
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${isActive('/student-dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-indigo-700 hover:bg-slate-50'}`}
                  >
                   <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}
                {user.role === 'company' && (
                  <Link
                    to="/company-dashboard"
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${isActive('/company-dashboard') ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-indigo-700 hover:bg-slate-50'}`}
                  >
                   <Briefcase className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 group"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors px-4 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
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