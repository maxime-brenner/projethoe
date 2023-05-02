import { NextFunction, Request, Response, request} from "express";
import mongoose from "mongoose";
import { IExamRefModel } from "../models/Biologie";

const {ExamenRef} = require('../models/Biologie');

const createExam = (req: Request, res: Response, next: NextFunction) => {
    const {name, units, minDefault, maxDefault} = req.body;

    const exam = new ExamenRef({
        _id:new mongoose.Types.ObjectId(),
        name,
        units,
        minDefault,
        maxDefault,
    });

    return exam.save()
    .then((exam: any) => res.status(201).json({ exam }))
    .catch((error: any) => res.status(500).json({error}));
};

const readAllExams = (req: Request, res: Response, next: NextFunction) => {
    return ExamenRef.find()
    .then((exam: IExamRefModel) => res.status(200).json({ exam }))
    .catch((error: any) => res.status(500).json({error}));
}

export default {createExam, readAllExams};