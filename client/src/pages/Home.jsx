import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in-up">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Bridge the Gap Between <span className="text-blue-600">Learning</span> and <span className="text-indigo-600">Earning</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SkillBridge is the ultimate internship portal. We don't just connect you with top companies; we analyze your skills and provide tailored courses to help you land your dream role.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          to="/register"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1"
        >
          I'm a Student
        </Link>
        <Link
          to="/register"
          className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-800 hover:text-indigo-600 rounded-xl font-bold text-lg transition shadow-sm hover:shadow-md transform hover:-translate-y-1"
        >
          I'm a Company
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        <div className="card hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🔍</div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Find Internships</h3>
          <p className="text-slate-600">Discover top internships from leading companies matching your exact career goals.</p>
        </div>
        <div className="card hover:shadow-md transition">
           <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🧠</div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Identify Skill Gaps</h3>
          <p className="text-slate-600">Our intelligent engine compares your current skills against industry requirements.</p>
        </div>
        <div className="card hover:shadow-md transition">
           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 text-2xl">🚀</div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">Level Up</h3>
          <p className="text-slate-600">Access curated, self-paced courses directly tailored to bridge your specific missing skills.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;