import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [stipend, setStipend] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const fetchMyInternships = async () => {
    try {
      // In a real app we'd have an endpoint like /api/internships/my to only fetch for this company
      // For simplicity here, we'll fetch all and filter client side
      const { data } = await api.get('/internships');
      const mine = data.filter(i => i.company?._id === user._id);
      setInternships(mine);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching internships", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInternships();
  }, [user]);

  const handlePostInternship = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const requirementsArray = requirements
      .split(',')
      .map((req) => req.trim())
      .filter((req) => req.length > 0);

    const newInternship = {
      title,
      description,
      requirements: requirementsArray,
      stipend,
      location,
      duration,
    };

    try {
      await api.post('/internships', newInternship);
      setMessage('Internship posted successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setRequirements('');
      setStipend('');
      setLocation('');
      setDuration('');
      
      // Refresh list
      fetchMyInternships();
    } catch (error) {
       console.error("Error posting internship", error);
       setMessage('Failed to post internship.');
    }
  };

  if (!user || user.role !== 'company') {
    return <div className="text-center p-8">Unauthorized Access</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
      {/* Post Internship Form */}
      <div>
        <div className="card sticky top-24">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Post a New Internship</h2>
          {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-sm border border-green-200">{message}</div>}
          
          <form onSubmit={handlePostInternship} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Frontend Developer Intern" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea className="input-field" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe the role..." />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input type="text" className="input-field" value={requirements} onChange={(e) => setRequirements(e.target.value)} required placeholder="e.g. React, Node.js, CSS" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stipend</label>
                  <input type="text" className="input-field" value={stipend} onChange={(e) => setStipend(e.target.value)} required placeholder="e.g. $1000/mo" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <input type="text" className="input-field" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="e.g. 3 Months" />
                </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="e.g. Remote, San Francisco" />
            </div>
            
            <button type="submit" className="w-full btn-primary text-lg mt-4 shadow-md hover:shadow-lg">
              Post Internship
            </button>
          </form>
        </div>
      </div>

      {/* Posted Internships List */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Active Listings</h2>
        
        {loading ? (
             <div className="flex justify-center p-4">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
             </div>
        ) : internships.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-500">
            You haven't posted any internships yet.
          </div>
        ) : (
          <div className="space-y-4 transition-all">
            {internships.map((internship) => (
              <div key={internship._id} className="card hover:shadow-md hover:border-blue-200 transition relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:w-2 transition-all"></div>
                <div className="pl-4">
                    <h3 className="text-xl font-bold text-slate-800">{internship.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">{internship.location} • {internship.stipend}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                    {internship.requirements.map((req, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                        {req}
                        </span>
                    ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
