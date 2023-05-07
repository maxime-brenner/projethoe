import mongoose, {Document, Schema, Types} from "mongoose";

interface IExamRef {
    name: string;
    units: string[];
    minDefault: number;
    maxDefault: number;
}

interface IExamUnique {
    value: number;
    unit: string;
    date: Date;
    patient: Types.ObjectId;
}

interface IExamPatient extends IExamRef {
    data : Array<IExamUnique>
}

export interface IExamRefModel extends IExamRef, Document {};
export interface IExamUniqueModel extends IExamUnique, Document {};
export interface IExamPatientModel extends IExamPatient, Document {};

const ExamRefSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        units: [String],
        minDefault: {type: Number, require:false},
        maxDefault: {type: Number, require:false},
    },
    {
        versionKey: false
    }
    
)
const ExamUniqueSchema: Schema = new Schema(
    {
        value: {type: Number, require: true},
        unit: {type: String, require: true},
        date: {type: Date, require: true},
        patient: {type: Schema.Types.ObjectId, require: true},
    },
    {
        versionKey: false
    }
    
)
const ExamPatientSchema: Schema = new Schema (
    {   name: {type: String, require: true},
        units: [String],
        minDefault: {type: Number, require:false},
        maxDefault: {type: Number, require:false},
        data: {type: Array<IExamUnique>, default:[]},
    }
)

module.exports = {
    ExamenRef: mongoose.model<IExamRefModel>('ExamenRef', ExamRefSchema),
    ExamenUnique: mongoose.model<IExamUniqueModel>('ExamenUnique', ExamUniqueSchema),
    ExamenPatient: mongoose.model<IExamPatientModel>('ExamenPatient', ExamPatientSchema),
}; 


