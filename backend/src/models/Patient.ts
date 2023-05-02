import mongoose, { Document, Schema, Types} from 'mongoose';
import { IExamPatientModel } from './Biologie';

interface IPatient{
    name: string;
    firstName: string;
    birthDate: Date;
    exams: Types.DocumentArray<IExamPatientModel>;
}

export interface IPatientModel extends IPatient, Document {}

const PatientSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        firstName: {type: String, require: false},
        birthDate: {type: Date, require: false},
        exams: {type: Array<IExamPatientModel>, default: []}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPatientModel>('Patient', PatientSchema);