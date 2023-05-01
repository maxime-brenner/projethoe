import * as Yup from 'yup';
import axios from 'axios';

const submitCode = (values:any) => {
    axios
    .post(`http://localhost:9090/cim/create/`, { code:values.code, name:values.name })
    .then((res) => console.log(res.status))
    .catch((err) => console.log(err, values.patient))
};

const codeForm = () => {
    return {
        initialValues: {code:'', name:''},
        onSubmit: (values: any) => {submitCode(values)},
        validationSchema : Yup.object ({
            code: Yup.string().trim().required("Code requis"),
            name: Yup.string().trim().required("Nom requis"),
        }),
    }
};

export default codeForm;