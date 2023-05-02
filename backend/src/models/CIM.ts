import mongoose, { Document, Schema, Types} from 'mongoose';

interface ICode {
    code: string,
    name: string,
    children: Types.DocumentArray<ICodeModel>
}

export interface ICodeModel extends ICode, Document {}

const CodeSchema: Schema = new Schema(
    {
        code: {type: String, require: true},
        name: {type: String, require: true},
        children: {type: Array<ICodeModel>, require: false},
    },
    {
        versionKey: false,
    }
)

export default mongoose.model<ICodeModel>('Code', CodeSchema);

