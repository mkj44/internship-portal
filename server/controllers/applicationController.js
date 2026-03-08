import Application from '../models/Application.js';

// @desc    Apply for an internship
// @route   POST /api/applications
// @access  Private/Student
const createApplication = async (req, res) => {
  const { internshipId, coverLetter } = req.body;

  const existingApplication = await Application.findOne({
    student: req.user._id,
    internship: internshipId,
  });

  if (existingApplication) {
    return res.status(400).json({ message: 'Already applied for this internship' });
  }

  const application = new Application({
    student: req.user._id,
    internship: internshipId,
    coverLetter,
  });

  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
};

// @desc    Get applications for a company's internship
// @route   GET /api/applications/internship/:id
// @access  Private/Company
const getApplicationsForInternship = async (req, res) => {
  // Can add a check here to ensure the requesting company owns this internship
  const applications = await Application.find({ internship: req.params.id }).populate(
    'student',
    'name email skills'
  );
  res.json(applications);
};

// @desc    Get student's applications
// @route   GET /api/applications/my
// @access  Private/Student
const getMyApplications = async (req, res) => {
  const applications = await Application.find({ student: req.user._id }).populate({
    path: 'internship',
    populate: { path: 'company', select: 'companyName' },
  });
  res.json(applications);
};

export { createApplication, getApplicationsForInternship, getMyApplications };
