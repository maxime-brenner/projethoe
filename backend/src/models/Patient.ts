import mongoose, { Document, Schema, Types} from 'mongoose';
import { IExamPatientModel } from './Biologie';
import IMedicamentPosologie from './Medicament';

interface IPatient{
    name: string;
    firstName: string;
    birthDate: Date;
    exams: Types.DocumentArray<IExamPatientModel>;
    treatment: Types.DocumentArray<IMedicamentPosologie>;

}

export interface IPatientModel extends IPatient, Document {}

const PatientSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        firstName: {type: String, require: false},
        birthDate: {type: Date, require: false},
        exams: {type: Array<IExamPatientModel>, default: []},
        treatment: {type: Array<IMedicamentPosologie>, default: []}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPatientModel>('Patient', PatientSchema);