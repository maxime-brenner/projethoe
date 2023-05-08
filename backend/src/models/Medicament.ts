import mongoose, { Document, Schema, Types} from 'mongoose';

class IMedicamentPosologie {
    name: string;
    doseUnitaire: number;
    formeGalenique: string;
    posologie: Array<{moment:string, quantity:number}>;
    frequency: string;

    constructor(name: string, doseUnitaire: number, formeGalenique:string, posologie:Array<{moment:string, quantity:number}>, frequency:string){
        if (this.checkType(doseUnitaire)){
            this.name = name;
            this.doseUnitaire = doseUnitaire;
            this.formeGalenique = formeGalenique;
            this.posologie = posologie;
            this.frequency = frequency; 
        } else {
            throw TypeError("Pas le bon type");
        }
    };

    checkType(param:any): boolean {
       return (typeof(param)) === 'number' ? true : false;
    }
};

export default IMedicamentPosologie;