import express from "express";
import controller from '../controllers/Patient';

const router = express.Router();

router.post('/create/', controller.createPatient);
router.get('/get/:patientId', controller.readPatient);
router.get('/get/', controller.readAllPatient);
router.patch('/update/:patientId', controller.UpdatePatient);
router.delete('/delete/:patientId', controller.DeletePatient);

export = router;