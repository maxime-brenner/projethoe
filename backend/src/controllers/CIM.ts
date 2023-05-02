import { NextFunction, Request, Response, request} from "express";
import mongoose from "mongoose";
import { ICodeModel } from "../models/CIM";
import Code from "../models/CIM";

const readAllCode = (req: Request, res: Response, next: NextFunction) => {
    return Code.find()
    .then(codes => res.status(200).json({ codes }))
    .catch(error => res.status(500).json({ error }));
}

const createCode = (req: Request, res: Response, next: NextFunction) => {
    const {code, name, children} = req.body;

    const newCode = new Code ({
        _id: new mongoose.Types.ObjectId(),
        code,
        name,
        children
    })

    return newCode.save()
    .then(newCode => res.status(201).json({ newCode }))
    .catch(error => res.status(500).json({error}));
}

export default { readAllCode, createCode }