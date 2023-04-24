import * as Yup from 'yup';
import { parse } from 'date-fns';
import axios from 'axios';

function todayDate(): string {
    const date:Date= new Date();
    console.log(`date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${date.getDate()}`;  
};

const today = todayDate()

const submitExam = (values:any) => {
    axios
    .patch(`http://localhost:9090/patient/update/exams/${values.patient}`,
    {
        name:values.name,
        units:[values.units],
        value:values.value,
        date:values.date,
        patient:values.patient
    })
    .then((res) => console.log(res.status))
    .catch((err) => console.log(err, values.patient))
}; 

const examForm = () => {
    return {
    initialValues: {name:'', units: '', value: '', date: '', patient:''},
    onSubmit: (values:any) => {submitExam(values)},
    validationSchema: Yup.object({
        name: Yup.string().trim().required("Nom requis"),
        units: Yup.string().trim().required("Unité requise"),
        value: Yup.number().required("Indiquez une valeur"),
        date: Yup.date().required(),
        patient: Yup.string().trim().required("Patient on selectionné")
    }),
    }
};

export default examForm