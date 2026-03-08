import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';

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
    return <div className="text-center p-8">Unauthorized Access</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.name}</h1>
        <p className="text-slate-500 mt-2">Discover internships and bridge your skill gaps.</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-slate-600 mr-2 self-center">Your Skills:</span>
            {user.skills && user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 font-medium">
                    {skill}
                </span>
            ))}
            {(!user.skills || user.skills.length === 0) && <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded border border-amber-200">No skills added yet. Update your profile to get better matches!</span>}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-700 mb-6">Available Internships</h2>

      {loading ? (
        <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : internships.length === 0 ? (
        <div className="card text-center text-slate-500 py-12">No internships available right now. Check back later!</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <div key={internship._id} className="card hover:shadow-lg transition flex flex-col h-full border-t-4 border-t-blue-500">
              <div className="flex-grow">
                <div className="text-xs font-semibold text-blue-600 mb-2 tracking-wide uppercase">
                  {internship.company?.companyName || 'Unknown Company'}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{internship.title}</h3>
                
                <div className="space-y-2 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><FiMapPin className="text-slate-400" /> {internship.location}</div>
                  <div className="flex items-center gap-2"><FiClock className="text-slate-400" /> {internship.duration}</div>
                  <div className="flex items-center gap-2"><FiDollarSign className="text-slate-400" /> {internship.stipend}</div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {internship.requirements.slice(0, 4).map((req, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                        {req}
                      </span>
                    ))}
                    {internship.requirements.length > 4 && <span className="text-xs text-slate-400 self-center">+{internship.requirements.length - 4} more</span>}
                  </div>
                </div>
              </div>
              
              <Link
                to={`/internships/${internship._id}`}
                className="mt-4 block w-full text-center py-2 bg-slate-50 border border-slate-200 text-blue-600 rounded font-medium hover:bg-blue-50 hover:border-blue-200 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
