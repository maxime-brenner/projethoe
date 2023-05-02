import mongoose, { Document, Schema, Types} from 'mongoose';
import { IExamModel } from './Biologie';
import { ICodeModel } from './CIM';

interface IModule {
    name: string,
    patient: Types.ObjectId,
    exams: IExamModel[],
    code: ICodeModel[],
}

export interface IModuleModel extends IModule, Document {}

