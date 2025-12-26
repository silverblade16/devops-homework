import express from 'express';
import codeReviewController from '../controllers/reviewController.js';
const router = express.Router();
router.post('/code-review', codeReviewController.processCodeReview);

export default router;