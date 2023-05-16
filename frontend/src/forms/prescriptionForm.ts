import axios from "axios";

const submitPrescription = (values: any) => {
    axios
    .patch(`http://localhost:9090/patient/update/treatment/643b231338b017d1dc620862`,
    {
        /* name: values.name,
        doseUnitaire: values.doseUnitaire,
        formeGalenique: values.formeGalenique,
        posologie: values.posologie,
        frequency: values.frequency */
    })
    .then((res) => console.log(res.status, values))
    .catch((err) => console.log(err));
}


const prescriptionForm = () => {
    return {
        initialValues: {name:'', doseUnitaire:null, formeGalenique:'', posologie:[], frequency:''},
        onSubmit: (values:any) => {submitPrescription(values)},
    }
};

export default prescriptionForm;