import mongoose, {Document, Schema, Types} from "mongoose";

interface IExam {
    name: string;
    units: string[];
    value: number;
    date: Date;
    patient: Types.ObjectId;
}

export interface IExamModel extends IExam, Document {}

const ExamSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        units: [String],
        value: {type: Number, require: true},
        date: {type: Date, require: true},
        patient: {type: Schema.Types.ObjectId, require: true},
    },
    {
        versionKey: false
    }
    
)

export default mongoose.model<IExamModel>('Examen', ExamSchema)

