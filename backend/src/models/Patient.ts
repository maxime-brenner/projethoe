import { string } from 'joi';
import mongoose, { Document, Schema} from 'mongoose';

interface IPatient{
    name: string;
    firstName: string;
    birthDate: Date;
}

export interface IPatientModel extends IPatient, Document {}

const PatientSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        firstName: {type: String, require: false},
        birthDate: {type: Date, require: false},

    },
    {
        versionKey: false
    }
    
);

export default mongoose.model<IPatientModel>('Patient', PatientSchema);