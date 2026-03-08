import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Building2, AlignLeft, Target, MapPin, Clock, DollarSign, Activity, ListChecks } from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    stipend: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchMyInternships = async () => {
    try {
      const { data } = await api.get('/internships');
      const myInternships = data.filter(i => i.company && i.company._id === user._id);
      setInternships(myInternships);
    } catch (error) {
      console.error("Error fetching internships", error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'company') {
      fetchMyInternships();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const requirementsArray = formData.requirements
        .split(',')
        .map((req) => req.trim())
        .filter((req) => req.length > 0);

      const payload = {
        ...formData,
        requirements: requirementsArray,
      };

      await api.post('/internships', payload);
      setMessage({ text: 'Internship posted successfully!', type: 'success' });
      setFormData({
        title: '',
        description: '',
        requirements: '',
        location: '',
        stipend: '',
        duration: '',
      });
      fetchMyInternships();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to post internship', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'company') {
    return <div className="text-center p-8 mt-10 card">Unauthorized Access</div>;
  }

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-10 card bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/20 relative overflow-hidden">
         {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full mix-blend-overlay filter blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user.companyName} Dashboard</h1>
                <p className="text-blue-100 font-medium text-lg mt-1">Manage your postings and discover top talent.</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Post Internship Form */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <PlusCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Post New Role</h2>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {message.type === 'success' ? <Activity className="w-4 h-4" /> : null}
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30"
                  required
                  placeholder="e.g. Frontend Engineer Intern"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Required Skills</label>
                <input
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30"
                  required
                  placeholder="React, CSS, Node.js (comma separated)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30"
                      required
                      placeholder="Remote / NY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30"
                      required
                      placeholder="3 Months"
                    />
                  </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Stipend</label>
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30"
                  required
                  placeholder="$1000/month or Unpaid"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field text-sm py-2 shadow-sm focus:ring-indigo-500/30 min-h-[100px] resize-y"
                  required
                  placeholder="Describe the day-to-day responsibilities..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary mt-6 !py-3 flex items-center justify-center gap-2 text-base shadow-indigo-500/20"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Internship'}
                {!loading && <Target className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Postings */}
        <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 pl-2">
                <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600 border border-blue-200/50">
                    <ListChecks className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Active Listings</h2>
                <span className="ml-auto bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-blue-100">
                    {internships.length} Active
                </span>
            </div>

          {internships.length === 0 ? (
            <div className="card text-center py-16 border-dashed border-2 bg-slate-50 text-slate-500">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Activity className="w-8 h-8 text-slate-300" />
                </div>
                <p className="font-semibold text-lg">You haven't posted any internships yet.</p>
                <p className="text-sm mt-1 max-w-sm mx-auto">Use the form on the left to create your first listing and start receiving applications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship._id} className="card p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hover:border-blue-300 transition-colors group">
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {internship.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {internship.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {internship.duration}</span>
                        <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400" /> {internship.stipend}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {internship.requirements.map((req, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] uppercase font-bold tracking-wider rounded border border-slate-200">
                            {req}
                        </span>
                        ))}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto mt-4 sm:mt-0">
                      <button className="w-full sm:w-auto btn-secondary text-sm !px-4 !py-2">View Applicants</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
