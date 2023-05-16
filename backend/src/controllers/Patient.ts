import { NextFunction, Request, Response, request} from "express";
import mongoose from "mongoose";
import Patient from "../models/Patient";
import { IPatientModel } from "../models/Patient";
import { IExamPatientModel, IExamRefModel, IExamUniqueModel } from "../models/Biologie";
import IMedicamentPosologie from "../models/Medicament";
import { Schema } from "mongoose";
import { exist } from "joi";

const {ExamenRef, ExamenUnique, ExamenPatient} = require('../models/Biologie');

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
            patient.set(req.body);
            return patient.save()
                .then(patient => res.status(201).json({patient}))
                .catch(error => res.status(500).json({error}));
        }
        else
        {
            res.status(404).json({ message: 'Patient non trouvé' })
        }
    })
    .catch(error => res.status(500).json({error}));
};

const UpdateExams = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findById(patientId)
    .then((pat) => {
        if (pat) 
        {   
            const check = pat.exams.find(obj => obj.name === req.body.name);
            if (!check){
                const {name, patient} = req.body;
                const {value, unit, date} = req.body.data;
                const newValue: IExamUniqueModel = new ExamenUnique ({
                    value,
                    unit,
                    date,
                    patient
                });
                const newExam: IExamPatientModel = new ExamenPatient({
                    name,
                    data:[newValue],
                    patient,
                });
                

                pat.exams.push(newExam);

                return pat.save()
                .then((exam) => res.status(200).json({message: `l examen ${name} a été créé`, patient:pat}))
                .catch(error => res.json({ error: error }))
            } else {
                const {value, unit, date, patient} = req.body.data;
                const newValue: IExamUniqueModel = new ExamenUnique ({
                    value,
                    unit,
                    date,
                    patient
                });
                /* check.data.push(newValue); */
                check.data.push(newValue);
                check.data.sort((a,b) => {return a.date.getUTCMilliseconds() - b.date.getUTCMilliseconds()}); 
                pat.markModified('exams');
                return pat.save()
                .then((exam) => res.status(200).json({ message: 'Nouvelle valeur ajoutée', patient:pat, check:check, exam:exam.exams }))
                .catch(error => res.json({ message : error }));
            }         
        }
        else
        {
            res.status(404).json({ message: 'Patient non trouvé' });
        }
    })
};

const UpdateTreatment = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId;

    return Patient.findById(patientId)
    .then((pat) => {
        if (pat){
            try {
               const {name, doseUnitaire, formeGalenique, posologie, frequency} = req.body;
                const treatment = new IMedicamentPosologie(name, doseUnitaire, formeGalenique, posologie, frequency);
                pat.treatment.push(treatment);
                pat.markModified('treatment');
                return pat.save()
                .then((treatment) => res.json({ msg: "Traitement mis à jour", treatment:treatment }))
                .catch(error => res.json({ msg: error })); 
            } catch(e){
                res.json({"Erreur lors de la construction de l'instance": typeof(e)})
            }
        }
    })
    .catch(error => res.json({msg : error}))
};

/* const UpdateExams = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findById(patientId)
    .then((pat) => {
        if (pat) 
        {   

            try {
                const {name, units, value, date, patient} = req.body;
                const exam = new Examen({
                    name,
                    units,
                    value,
                    date,
                    patient
                });

                try {
                    exam.save()
                } catch(error){
                    res.status(400).json({ message: 'Requête invalide', error})
                }
                
                pat.exams.push(exam)
                return pat.save()
                .then((pat: IPatientModel) => res.status(201).json({message:`Examens ajouté avec succès au patient${pat}`}))
                .catch((error: any) => res.status(500).json({error}));
            }
            catch (error)
            {   
                console.log(error)
            }
                      
        }
        else
        {
            res.status(404).json({ message: 'Patient non trouvé' })
        }
    })
}; */

const DeleteExam = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId;
        var ObjectID = require('mongoose').Types.ObjectId;
    const examId = new ObjectID(require('url').parse(req.url,true).query.examId);

    return Patient.updateOne({ _id:patientId}, {
        $pull: {
            exams: {_id:examId},
        },
    })
    .then(patient => patient ? res.status(200).json({ message: `Examen ${examId} supprimé`, patient }): res.status(404).json({ message: 'Examen non trouvé' }))
    .catch(error => res.status(500).json({error}));

};

const DeletePatient = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findByIdAndDelete(patientId)
    .then(patient => patient ? res.status(200).json({ message: 'Patient supprimé' }) : res.status(404).json({ message: 'Patient non trouvé' }))
    .catch(error => res.status(500).json({message: error}));
};

const DeleteAllExams = (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.params.patientId

    return Patient.findById(patientId)
    .then((patient) => {
        if (patient) 
        {
            patient.set({exams: []})
            return patient.save()
            .then(patient => res.status(201).json({message:`Examens supprimés avec succès au patient${patient}`}))
            .catch(error => res.status(500).json({error}));
        }
    })
}

/* const TestTypeChecking = (req: Request, res: Response, next: NextFunction) => {
    
    try
    {   
        const dataTest: IExamModel= req.body
        function isExam(request: any): any{
            const test = new Examen(dataTest)
            test.save()
            console.log(test instanceof Examen, test)
        }
        const request = req.body
        return res.status(200).json({ message: "La requête est du bon type", isExam: isExam(request), req: req.body})
    } 
    catch(error) 
    {
        return res.status(500).json({ message: "La requête n'est pas du bon type" })
    }
} */

export default {createPatient, readAllPatient, readPatient, UpdatePatient, UpdateExams, UpdateTreatment, DeletePatient, DeleteAllExams, DeleteExam};