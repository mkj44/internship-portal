import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FiExternalLink, FiAlertCircle } from 'react-icons/fi';

const SkillGapAnalysis = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [gapData, setGapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSkillGap = async () => {
            try {
                const { data } = await api.get(`/courses/skill-gap/${id}`);
                setGapData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching skill gap", err);
                setError('Failed to load skill gap analysis.');
                setLoading(false);
            }
        };

        if (user && user.role === 'student') {
            fetchSkillGap();
        }
    }, [id, user]);

    if (loading) {
        return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    if (error) {
        return <div className="text-center text-red-600 p-8">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Skill Gap Analysis</h1>
                <Link to={`/internships/${id}`} className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
                    ← Back to Internship
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
               {/* Current Skills Summary */}
               <div className="card bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-sm md:col-span-1">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-sm">🎒</span>
                        Your Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills && user.skills.length > 0 ? (
                            user.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-white border border-slate-300 text-slate-600 rounded-md text-sm font-medium shadow-sm">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-slate-500 italic">No skills listed in profile</span>
                        )}
                    </div>
                </div>

                {/* Missing Skills Summary */}
                <div className="card bg-gradient-to-br from-red-50 to-orange-50 border-red-100 shadow-sm md:col-span-2">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded bg-red-200 flex items-center justify-center text-sm">🚧</span>
                        Skills Needed for this Role
                    </h3>
                    
                    {gapData?.missingSkills?.length > 0 ? (
                        <div>
                            <p className="text-sm text-red-700 mb-3 flex items-center gap-1">
                                <FiAlertCircle /> We identified {gapData.missingSkills.length} skill(s) you might be missing.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {gapData.missingSkills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-white border-2 border-red-200 text-red-700 rounded-md text-sm font-bold shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                            <div className="text-4xl mb-2">🎉</div>
                            <p className="font-bold text-green-700">Perfect Match!</p>
                            <p className="text-sm text-green-600">You appear to have all the requirements for this role.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Course Recommendations */}
            {gapData?.missingSkills?.length > 0 && (
                 <div className="mt-12">
                     <h2 className="text-2xl font-bold border-b border-indigo-100 text-slate-800 pb-2 mb-6 flex items-center gap-3">
                         <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">🎓</span>
                         Recommended Courses
                     </h2>
                     <p className="text-slate-600 mb-6">Level up your profile with these curated resources to cover your skill gap rapidly.</p>

                     {gapData.recommendedCourses?.length > 0 ? (
                         <div className="grid gap-4 md:grid-cols-2">
                             {gapData.recommendedCourses.map(course => (
                                 <a 
                                    key={course._id} 
                                    href={course.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="card hover:border-indigo-400 hover:shadow-lg transition group border-2 border-transparent"
                                 >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{course.platform}</div>
                                        <FiExternalLink className="text-slate-300 group-hover:text-indigo-600 transition" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition">{course.title}</h4>
                                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{course.description}</p>
                                    <div className="mt-auto">
                                        <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded inline-block">
                                            Teaches: {course.skill}
                                        </span>
                                    </div>
                                 </a>
                             ))}
                         </div>
                     ) : (
                         <div className="card p-8 text-center text-slate-500 bg-slate-50 border border-slate-200">
                             We don't have perfect course matches for these exact skills right now, but we recommend doing an independent search for 
                             <strong className="text-slate-700 ml-1">{gapData.missingSkills.join(', ')}</strong>!
                         </div>
                     )}
                 </div>
            )}
        </div>
    );
};

export default SkillGapAnalysis;
