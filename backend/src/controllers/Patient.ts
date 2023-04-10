import { NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import Patient from "../models/Patient";

const createPatient = (req: Request, res: Response, next: NextFunction) => {
    const { name, firstName, birthDate} = req.body;

    const patient = new Patient({
        _id: new mongoose.Types.ObjectId(),
        name,
        firstName,
        birthDate,

    });

    return patient.save()
    .then(author => res.status(201).json({ patient}))
    .catch(error => res.status(500).json({error}));
};

const readPatient = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findById(patientId)
    .then(patient => patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Patient non trouvé' }))
    .catch(error => res.status(500).json({error}));
};

const readAllPatient = (req: Request, res: Response, next: NextFunction) => {
    return Patient.find()
    .then(patients => res.status(200).json({ patients }))
    .catch(error => res.status(500).json({error}));
};

const UpdatePatient = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findById(patientId)
    .then((patient) => {
        if (patient)
        {
            patient.set(req.body)
            return patient.save()
                .then(author => res.status(201).json({ patient}))
                .catch(error => res.status(500).json({error}));

        }
        else
        {
            res.status(404).json({ message: 'Patient non trouvé' })
        }
    })
    .catch(error => res.status(500).json({error}));
};

const DeletePatient = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findByIdAndDelete(patientId)
    .then(patient => patient ? res.status(200).json({ message: 'Patient supprimé' }) : res.status(404).json({ message: 'Patient non trouvé' }))
    .catch(error => res.status(500).json({error}));
};

export default {createPatient, readAllPatient, readPatient, UpdatePatient, DeletePatient};