import express from "express";
import controller from '../controllers/Patient';

const router = express.Router();

router.post('/create/', controller.createPatient);
router.get('/get/:patientId', controller.readPatient);
router.get('/get/', controller.readAllPatient);
router.patch('/update/:patientId', controller.UpdatePatient);
router.patch('/update/exams/:patientId', controller.UpdateExams);
router.delete('/delete/:patientId', controller.DeletePatient);
router.patch('/delete/exams/:patientId', controller.DeleteAllExams);
router.patch('/delete/exam/:patientId', controller.DeleteExam);

/* Test */

/* router.get('/testType/', controller.TestTypeChecking) */

export = router;