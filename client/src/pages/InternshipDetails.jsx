import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, DollarSign, Building2, AlignLeft, Send, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyState, setApplyState] = useState({ loading: false, message: '', type: '' });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await api.get(`/internships/${id}`);
        setInternship(data);
      } catch (error) {
        console.error("Error fetching internship details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    setApplyState({ loading: true, message: '', type: '' });
    try {
      await api.post('/applications', { internshipId: id, coverLetter: "Standard application" });
      setApplyState({ loading: false, message: 'Application submitted successfully!', type: 'success' });
    } catch (error) {
      setApplyState({ 
        loading: false, 
        message: error.response?.data?.message || 'Failed to apply', 
        type: 'error' 
      });
    }
  };

  const handleAnalyzeGap = () => {
      navigate(`/skill-gap/${id}`);
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64 text-indigo-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );
  }

  if (!internship) {
    return <div className="text-center p-8 mt-10 card">Internship not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
      
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex flex-row items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Listings
      </button>

      <div className="card !p-0 overflow-hidden relative border-0 shadow-xl shadow-slate-200/50">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative background overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase">
                        <Building2 className="w-4 h-4 text-blue-200" /> {internship.company?.companyName || 'Verified Company'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">{internship.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-indigo-100 font-medium">
                        <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-200" /> {internship.location}</div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-200" /> {internship.duration}</div>
                        <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-indigo-200" /> {internship.stipend}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Bar (Sticky on mobile, part of header on desktop ideally) */}
        {user?.role === 'student' && (
            <div className="bg-slate-50 border-b border-slate-200 p-4 sm:px-12 flex flex-col sm:flex-row gap-4 items-center justify-end">
                {applyState.message && (
                    <div className={`mr-auto text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg ${applyState.type === 'success' ? 'text-emerald-700 bg-emerald-100' : 'text-red-600 bg-red-100'}`}>
                        {applyState.type === 'error' && <AlertCircle className="w-4 h-4" />}
                        {applyState.message}
                    </div>
                )}
                
                <button 
                  onClick={handleAnalyzeGap}
                  className="w-full sm:w-auto btn-secondary !py-3 flex items-center justify-center gap-2 group border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" /> 
                  Match My Skills
                </button>
                
                <button 
                  onClick={handleApply}
                  disabled={applyState.loading || applyState.type === 'success'}
                  className="w-full sm:w-auto btn-primary !py-3 flex items-center justify-center gap-2 shadow-indigo-500/30"
                >
                  {applyState.loading ? 'Submitting...' : applyState.type === 'success' ? 'Applied' : 'Apply Now'}
                  {(!applyState.loading && applyState.type !== 'success') && <Send className="w-4 h-4" />}
                </button>
            </div>
        )}

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-10">
            
            <section className="prose prose-slate max-w-none">
                <h3 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    <AlignLeft className="w-6 h-6 text-indigo-500" /> About the Role
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">{internship.description}</p>
            </section>

            <section>
                <h3 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <Sparkles className="w-6 h-6 text-indigo-500" /> Minimum Requirements
                </h3>
                <div className="flex flex-wrap gap-3">
                    {internship.requirements.map((req, i) => (
                    <div key={i} className="px-4 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        {req}
                    </div>
                    ))}
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
