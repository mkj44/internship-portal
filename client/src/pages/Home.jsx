import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-12 animate-fade-in-up pb-20 relative">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="space-y-6 max-w-4xl relative z-10 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm mb-4 animate-subtle-pulse shadow-sm">
          <SparklesIcon className="w-4 h-4" /> The Next Generation of Hiring
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
          Bridge the gap between <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
            Learning and Earning
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          SkillBridge doesn't just list internships. Our intelligent engine analyzes your skills, finds the exact gaps keeping you from your dream role, and gives you the tools to bridge them.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full sm:w-auto z-10">
        <Link
          to="/register"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 font-pj rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-1 text-lg w-full sm:w-auto"
        >
          I'm a Student <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/register"
          className="group inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 shadow-sm hover:shadow-md hover:-translate-y-1 text-lg w-full sm:w-auto"
        >
          I'm a Company
        </Link>
      </div>

      {/* Feature grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left w-full z-10 px-4">
        
        <div className="card group hover:-translate-y-2 !p-8 bg-gradient-to-b from-white to-blue-50/50 border-blue-100/50">
          <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-blue-200/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
             <Search className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-2xl mb-3 text-slate-800 tracking-tight">Discover Opportunities</h3>
          <p className="text-slate-600 leading-relaxed font-medium mb-6">Find transparent, high-quality internships from leading tech companies tailored specifically to your unique career trajectory.</p>
          <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Smart Matching</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Transparent Stipends</li>
          </ul>
        </div>

        <div className="card group hover:-translate-y-2 !p-8 bg-gradient-to-b from-white to-indigo-50/50 border-indigo-100/50">
           <div className="w-14 h-14 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-indigo-200/50 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
             <Target className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-2xl mb-3 text-slate-800 tracking-tight">Identify the Gap</h3>
          <p className="text-slate-600 leading-relaxed font-medium mb-6">Stop wondering why your resume gets rejected. Our algorithm compares your exact skills against real-world job requirements.</p>
          <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Deep Skill Parsing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Actionable Insights</li>
          </ul>
        </div>

        <div className="card group hover:-translate-y-2 !p-8 bg-gradient-to-b from-white to-purple-50/50 border-purple-100/50">
           <div className="w-14 h-14 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-purple-200/50 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
             <Rocket className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-2xl mb-3 text-slate-800 tracking-tight">Level Up Fast</h3>
          <p className="text-slate-600 leading-relaxed font-medium mb-6">Missing "Docker" or "Next.js"? We provide instant, highly-rated course recommendations so you can upskill and apply.</p>
          <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Curated Content</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Focused Upskilling</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

// Mini internal component for the sparkle icon
function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export default Home;