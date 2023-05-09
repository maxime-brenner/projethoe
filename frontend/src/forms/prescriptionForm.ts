
const prescriptionForm = () => {
    return {
        initialValues: {name:'', doseUnitaire:null, formeGalenique:'', posologie:[], frequency:''},
    }
};

export default prescriptionForm;