import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

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
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="card w-full max-w-lg mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Create an Account</h2>
        <p className="text-center text-slate-500 mb-8">Join SkillBridge to connect and grow.</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">{error}</div>}
        
        <div className="flex mb-8 bg-slate-100 p-1 rounded-lg">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${role === 'student' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('student')}
          >
            I'm a Student
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${role === 'company' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('company')}
          >
            I'm a Company
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          {role === 'student' && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                className="input-field"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, Python"
                required
              />
               <p className="text-xs text-slate-500 mt-1">We'll use these to match you with internships and find skill gaps.</p>
            </div>
          )}

          {role === 'company' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Description</label>
                <textarea
                  className="input-field"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  rows="3"
                  placeholder="What does your company do?"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="w-full btn-primary text-lg mt-4">
            Create Account
          </button>
        </form>
         <p className="mt-6 text-center text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;