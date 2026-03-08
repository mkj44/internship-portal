import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, GraduationCap, User, Mail, Lock, Sparkles, ArrowRight, Tags, AlignLeft } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formattedSkills = skills
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const userData = {
      name,
      email,
      password,
      role,
      skills: role === 'student' ? formattedSkills : undefined,
      companyName: role === 'company' ? companyName : undefined,
      companyDescription: role === 'company' ? companyDescription : undefined,
    };

    const result = await register(userData);
    if (result.success) {
      navigate(role === 'student' ? '/student-dashboard' : '/company-dashboard');
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 min-h-[85vh]">
      <div className="card w-full max-w-xl mb-12 relative overflow-hidden animate-fade-in-up border border-slate-200/60 shadow-xl shadow-slate-200/40">
        
        <div className="text-center justify-center flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-5 relative overflow-hidden group">
                 <Sparkles className="w-6 h-6 text-white relative z-10" />
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join SkillBridge</h2>
            <p className="text-slate-500 mt-2 font-medium">Create your account to unlock opportunities.</p>
        </div>
        
        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm text-center border border-red-200 font-medium animate-fade-in flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> {error}
            </div>
        )}
        
        {/* Role Toggle Switch */}
        <div className="flex p-1 mb-8 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-inner">
          <button
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'student' ? 'bg-white shadow-md text-indigo-600 border border-slate-200/50 scale-[1.02]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            onClick={() => setRole('student')}
          >
            <GraduationCap className={`w-5 h-5 ${role === 'student' ? 'text-indigo-500' : 'text-slate-400'}`} /> I'm a Student
          </button>
          <button
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'company' ? 'bg-white shadow-md text-blue-600 border border-slate-200/50 scale-[1.02]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            onClick={() => setRole('company')}
          >
            <Building2 className={`w-5 h-5 ${role === 'company' ? 'text-blue-500' : 'text-slate-400'}`} /> I'm a Company
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="input-field pl-11 shadow-sm focus:ring-indigo-500/40 focus:border-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="email"
                    className="input-field pl-11 shadow-sm focus:ring-indigo-500/40 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="password"
                    className="input-field pl-11 shadow-sm focus:ring-indigo-500/40 focus:border-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength="6"
                />
            </div>
          </div>

          <div className="h-px bg-slate-100 my-6"></div>

          {role === 'student' && (
            <div className="animate-fade-in-up">
              <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Your Core Skills</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tags className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-11 shadow-sm focus:ring-indigo-500/40 focus:border-indigo-500"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. React, Python, UI Design"
                    required
                  />
              </div>
               <p className="text-xs font-medium text-slate-500 mt-2 ml-1">Separate skills with commas. We use these for our intelligent matching engine.</p>
            </div>
          )}

          {role === 'company' && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Company Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                    type="text"
                    className="input-field pl-11 shadow-sm focus:ring-blue-500/40 focus:border-blue-500"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Corp"
                    required
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Company Description</label>
                <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                        <AlignLeft className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                    className="input-field pl-11 shadow-sm py-3 focus:ring-blue-500/40 focus:border-blue-500 resize-none"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    rows="3"
                    placeholder="What does your company do?"
                    required
                    />
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full btn-primary text-lg mt-8 group flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors">
              Sign in securely
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;