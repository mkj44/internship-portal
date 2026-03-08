import express from 'express';
const router = express.Router();
import {
  getSkillGapAndCourses,
  createCourse,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(createCourse); // Public route for populating
router.route('/skill-gap/:internshipId').get(protect, getSkillGapAndCourses);

export default router;
