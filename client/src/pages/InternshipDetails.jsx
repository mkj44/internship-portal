import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiClock, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

const InternshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await api.get(`/internships/${id}`);
        setInternship(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internship", error);
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setMessage('');
    try {
      await api.post('/applications', { internshipId: id });
      setMessage('Application submitted successfully!');
    } catch (error) {
       console.error("Error applying", error);
       setMessage(error.response?.data?.message || 'Failed to apply. You may have already applied.');
    } finally {
      setApplying(false);
    }
  };

  const handleAnalyzeSkillGap = () => {
    navigate(`/skill-gap/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!internship) {
    return <div className="text-center p-8 text-slate-500">Internship not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="card shadow-md">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b pb-6">
          <div>
            <div className="text-sm font-bold tracking-wide text-indigo-600 uppercase mb-2">
              {internship.company?.companyName}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{internship.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
               <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg"><FiMapPin className="text-slate-500"/> {internship.location}</div>
               <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg"><FiClock className="text-slate-500"/> {internship.duration}</div>
               <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg"><FiDollarSign className="text-slate-500"/> {internship.stipend}</div>
            </div>
          </div>
          
          {user?.role === 'student' && (
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button 
                onClick={handleApply} 
                disabled={applying}
                className="btn-primary w-full py-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
               {applying ? 'Applying...' : <><FiCheckCircle /> Apply Now</>}
              </button>
              <button 
                onClick={handleAnalyzeSkillGap}
                className="w-full py-3 bg-white border-2 border-indigo-600 text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition"
              >
                Analyze Skill Gap
              </button>
            </div>
          )}
        </div>

        {message && (
            <div className={`p-4 rounded-lg mb-8 font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {message}
            </div>
        )}

        <div className="space-y-8">
            <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">👔</span>
                    About the Role
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{internship.description}</p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">🛠️</span>
                    Requirements
                </h3>
                <div className="flex flex-wrap gap-2">
                    {internship.requirements.map((req, index) => (
                    <span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-medium">
                        {req}
                    </span>
                    ))}
                </div>
            </section>

             <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">About {internship.company?.companyName}</h3>
                <p className="text-slate-600">{internship.company?.companyDescription || 'No description provided.'}</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
