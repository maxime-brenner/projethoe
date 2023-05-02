import express from "express";
import codeController from "../controllers/CIM";

const router = express.Router();

router.get('/get/', codeController.readAllCode);
router.post('/create/', codeController.createCode);

export = router;