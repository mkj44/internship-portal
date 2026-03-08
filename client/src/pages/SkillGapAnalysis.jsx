import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { CheckCircle2, XCircle, ArrowRight, PlayCircle, Loader2, Sparkles, Target, Trophy, ChevronLeft } from 'lucide-react';

const SkillGapAnalysis = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await api.get(`/courses/skill-gap/${id}`);
        setAnalysis(data);
      } catch (error) {
        console.error("Error fetching skill gap analysis", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-indigo-600 space-y-4">
        <div className="relative">
             <Loader2 className="animate-spin h-16 w-16 text-indigo-500" />
             <div className="absolute inset-0 bg-indigo-500/20 rounded-full filter blur-xl animate-pulse"></div>
        </div>
        <p className="text-xl font-bold tracking-tight animate-pulse text-slate-800">Analyzing your skill profile...</p>
      </div>
    );
  }

  if (!analysis) {
    return <div className="text-center p-8 mt-10 card">Failed to generate analysis.</div>;
  }

  const hasGap = analysis.missingSkills && analysis.missingSkills.length > 0;
  const matchPercentage = Math.round((analysis.matchingSkills.length / (analysis.matchingSkills.length + analysis.missingSkills.length)) * 100) || 0;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up pb-20">
      
      <Link to={`/internships/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Internship
      </Link>

      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6 shadow-inner ring-1 ring-indigo-200/50">
           <Sparkles className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Skill Intelligence Report
        </h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            We've compared your profile against the role requirements. Here is your personalized action plan.
        </p>
      </div>

      {/* Main Analysis Card */}
      <div className="card !p-0 overflow-hidden mb-12 border-0 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row">
          
          {/* Left Panel: Score */}
          <div className={`md:w-1/3 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden ${hasGap ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
             
             <div className="relative z-10 text-center">
                 {hasGap ? <Target className="w-12 h-12 mx-auto mb-4 text-white/90" /> : <Trophy className="w-12 h-12 mx-auto mb-4 text-emerald-100" />}
                 <div className="text-6xl font-black mb-2">{matchPercentage}%</div>
                 <div className="text-lg font-bold text-white/80 uppercase tracking-widest">Match Score</div>
             </div>
          </div>

          {/* Right Panel: Skills Breakdown */}
          <div className="md:w-2/3 p-8 sm:p-10 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full items-center">
                  
                  {/* Matching Skills */}
                  <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> You Have
                      </h3>
                      {analysis.matchingSkills.length > 0 ? (
                          <div className="space-y-3">
                              {analysis.matchingSkills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 px-4 py-2.5 rounded-xl text-emerald-800 font-bold shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {skill}
                                </div>
                              ))}
                          </div>
                      ) : (
                          <p className="text-slate-500 text-sm font-medium italic">No matching skills found.</p>
                      )}
                  </div>

                  {/* Missing Skills */}
                  <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-400" /> You Need
                      </h3>
                      {hasGap ? (
                          <div className="space-y-3">
                              {analysis.missingSkills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 bg-red-50/50 border border-red-100 px-4 py-2.5 rounded-xl text-red-800 font-bold shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div> {skill}
                                </div>
                              ))}
                          </div>
                      ) : (
                          <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-center h-full">
                              <Trophy className="w-8 h-8 text-emerald-500 mb-2" />
                              <span className="text-emerald-800 font-bold">Perfect Match!</span>
                              <span className="text-emerald-600 text-xs mt-1 font-medium">You have all the required skills.</span>
                          </div>
                      )}
                  </div>

              </div>
          </div>
      </div>

      {hasGap && (
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Action Plan</h2>
              <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-indigo-100">
                {analysis.recommendedCourses.length} Recommended Courses
              </span>
          </div>
          
          {analysis.recommendedCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {analysis.recommendedCourses.map((course) => (
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={course._id} 
                  className="card group hover:-translate-y-2 !p-0 overflow-hidden flex flex-col h-full bg-white relative border border-slate-200/60"
                >
                  {/* Decorative Video Placeholder */}
                  <div className="h-32 bg-slate-100 w-full relative flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMSIgZmlsbD0iIzAwMCI+PC9jaXJjbGU+Cjwvc3ZnPg==')]"></div>
                      <PlayCircle className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 group-hover:-translate-y-1 transition-all duration-300 z-10 drop-shadow-sm" />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-100 uppercase tracking-wider">
                              {course.skill}
                          </span>
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                              {course.platform}
                          </span>
                      </div>
                      <h3 className="font-extrabold text-lg text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                          {course.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed">
                          {course.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-bold group-hover:text-indigo-700 transition-colors">
                          <span>Start Learning</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="card text-center py-16 bg-slate-50 border-dashed border-2 text-slate-500">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-lg mb-1">No courses found right now.</p>
                <p className="text-sm">We don't currently have courses in our database for your specific missing skills, but keep learning!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis;
