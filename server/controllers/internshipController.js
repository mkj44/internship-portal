import Internship from '../models/Internship.js';

// @desc    Fetch all internships
// @route   GET /api/internships
// @access  Public
const getInternships = async (req, res) => {
  const internships = await Internship.find({}).populate(
    'company',
    'companyName companyDescription'
  );
  res.json(internships);
};

// @desc    Fetch single internship
// @route   GET /api/internships/:id
// @access  Public
const getInternshipById = async (req, res) => {
  const internship = await Internship.findById(req.params.id).populate(
    'company',
    'companyName companyDescription'
  );

  if (internship) {
    res.json(internship);
  } else {
    res.status(404).json({ message: 'Internship not found' });
  }
};

// @desc    Create a new internship
// @route   POST /api/internships
// @access  Private/Company
const createInternship = async (req, res) => {
  const { title, description, requirements, stipend, location, duration } =
    req.body;

  const internship = new Internship({
    company: req.user._id, // Assuming authMiddleware sets req.user
    title,
    description,
    requirements, // Should be an array of strings
    stipend,
    location,
    duration,
  });

  const createdInternship = await internship.save();
  res.status(201).json(createdInternship);
};

export { getInternships, getInternshipById, createInternship };
