import { string } from 'joi';
import mongoose, { Document, Schema, Types} from 'mongoose';
import { IExamModel } from './Biologie';

interface IPatient{
    name: string;
    firstName: string;
    birthDate: Date;
    exams: Types.DocumentArray<IExamModel>;
}

export interface IPatientModel extends IPatient, Document {}

const PatientSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        firstName: {type: String, require: false},
        birthDate: {type: Date, require: false},
        exams: {type: Array<IExamModel>, default: []}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPatientModel>('Patient', PatientSchema);