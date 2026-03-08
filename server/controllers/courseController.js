import Course from '../models/Course.js';
import Internship from '../models/Internship.js';
import User from '../models/User.js';

// @desc    Analyze skill gap for an internship
// @route   GET /api/courses/skill-gap/:internshipId
// @access  Private/Student
const getSkillGapAndCourses = async (req, res) => {
  const internshipId = req.params.internshipId;

  const internship = await Internship.findById(internshipId);
  const student = await User.findById(req.user._id);

  if (!internship) {
    return res.status(404).json({ message: 'Internship not found' });
  }

  // Identify missing skills
  const studentSkills = student.skills.map((s) => s.toLowerCase());
  const missingSkills = internship.requirements.filter(
    (reqSkill) => !studentSkills.includes(reqSkill.toLowerCase())
  );

  // Find courses matching those missing skills
  let recommendedCourses = [];
  if (missingSkills.length > 0) {
    // Basic naive matching - looking for courses where the 'skill' field matches the missing skill case-insensitively
    const regexPattern = missingSkills.map((s) => new RegExp(`^${s}$`, 'i'));
    recommendedCourses = await Course.find({ skill: { $in: regexPattern } });
  }

  res.json({
    missingSkills,
    recommendedCourses,
  });
};

// @desc    Add a course (Utility for populating db)
// @route   POST /api/courses
// @access  Public
const createCourse = async (req, res) => {
  const { title, skill, url, platform, description } = req.body;

  const course = new Course({
    title,
    skill,
    url,
    platform,
    description,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

export { getSkillGapAndCourses, createCourse };
