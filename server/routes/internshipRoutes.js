import express from 'express';
const router = express.Router();
import {
  getInternships,
  getInternshipById,
  createInternship,
} from '../controllers/internshipController.js';
import { protect, company } from '../middleware/authMiddleware.js';

router.route('/').get(getInternships).post(protect, company, createInternship);
router.route('/:id').get(getInternshipById);

export default router;
