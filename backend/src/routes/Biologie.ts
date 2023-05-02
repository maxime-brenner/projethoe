import express from "express";
import controller from '../controllers/Biologie';

const router = express.Router();

router.get('/all-exams/', controller.readAllExams);
router.post('/create/', controller.createExam);

export = router;