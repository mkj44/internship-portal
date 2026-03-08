import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, DollarSign, Briefcase, GraduationCap, ChevronRight, Loader2, Award } from 'lucide-react';

const StudentDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await api.get('/internships');
        setInternships(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internships", error);
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (!user || user.role !== 'student') {
    return <div className="text-center p-8 mt-10 card">Unauthorized Access</div>;
  }

  return (
    <div className="animate-fade-in pb-12">
      
      {/* Header Profile Section */}
      <div className="mb-10 card bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Welcome, {user.name}</h1>
                </div>
                <p className="text-indigo-100 font-medium text-lg max-w-2xl">Your personalized portal to discover top internships and bridge your skill gaps.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl md:min-w-[300px]">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-indigo-50 uppercase tracking-wider flex items-center gap-2">
                        <Award className="w-4 h-4" /> Your Arsenal
                    </span>
                    <Link to="/profile" className="text-xs text-indigo-200 hover:text-white transition-colors underline underline-offset-2">Edit</Link>
                </div>
                <div className="flex flex-wrap gap-2">
                    {user.skills && user.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-white text-indigo-700 text-xs rounded-lg font-bold shadow-sm">
                            {skill}
                        </span>
                    ))}
                    {(!user.skills || user.skills.length === 0) && (
                        <span className="text-sm text-yellow-100 bg-yellow-500/20 border border-yellow-500/30 px-3 py-2 rounded-lg font-medium">
                            No skills added yet. Update your profile!
                        </span>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Available Opportunities
        </h2>
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100">
            {internships.length} Jobs
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center flex-col items-center p-20 text-indigo-600">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-semibold text-slate-500 animate-pulse">Loading internships...</p>
        </div>
      ) : internships.length === 0 ? (
        <div className="card text-center py-20 border-dashed border-2 bg-slate-50">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No listings found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">There are no internships available right now. Please check back later!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <Link 
              to={`/internships/${internship._id}`} 
              key={internship._id} 
              className="card group hover:border-indigo-300 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
            >
              {/* Subtle hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full inline-block">
                    {internship.company?.companyName || 'Unknown Company'}
                    </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors leading-tight">
                    {internship.title}
                </h3>
                
                <div className="space-y-2.5 mb-6 text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-slate-400" /> {internship.location}</div>
                  <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-slate-400" /> {internship.duration}</div>
                  <div className="flex items-center gap-3"><DollarSign className="w-4 h-4 text-slate-400" /> {internship.stipend}</div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.requirements.slice(0, 3).map((req, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200/60 font-semibold shadow-sm">
                        {req}
                      </span>
                    ))}
                    {internship.requirements.length > 3 && (
                        <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs rounded-md border border-slate-200 border-dashed font-semibold">
                            +{internship.requirements.length - 3}
                        </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-bold group-hover:text-indigo-700 transition-colors">
                  <span>View Details</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
