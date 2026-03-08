import express from 'express';
const router = express.Router();
import {
  createApplication,
  getApplicationsForInternship,
  getMyApplications,
} from '../controllers/applicationController.js';
import { protect, company } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createApplication);
router.route('/internship/:id').get(protect, company, getApplicationsForInternship);
router.route('/my').get(protect, getMyApplications);

export default router;
