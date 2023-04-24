import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import examsData from '../../features/examsData';
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import examForm from '../../forms/forms.ts';

function PatientDetail () {
    const params = useParams();
    const patientId = params.patientId;

    const [patientDetail, setPatientDetail] = useState({
        name: '',
        firstName:'',
        birthDate:'',
        exams:[{}],
    }); 

    const [selectedExam, setSelectedExam] = useState('')

    const form = useFormik(examForm());

    console.log(form)

    useEffect (() => {getPatient()}, []);

    const getPatient = async () => {
        const response = await axios.get(`http://localhost:9090/patient/get/${patientId}`);
        setPatientDetail(response.data.patient);
        console.log(patientDetail.exams[0]);
    };


    const htmlForm = (form, examCatalog) => {
        form.values.name=examCatalog.name;
        form.values.patient=patientDetail._id;
        console.log(form.values)
        return (
            <Form className='exam-form' onSubmit={form.handleSubmit}>
                <FormGroup>
                    <Label for={examCatalog.name.toLowerCase()}>Valeur</Label>
                    <Input
                    id={examCatalog.name.toLowerCase()}
                    type='value'
                    placeholder='entrez votre valeur'
                    name='value'
                    value={form.values.value}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="unit">Unité</Label>
                    <select name="units" id="unit" onChange={form.handleChange}>
                        <option value=''></option>
                        {examCatalog.units.map((unit) =>{
                            return <option key={unit} value={unit}>{unit}</option>;
                        }
                        )};
                    </select>
                </FormGroup>

                <FormGroup>
                    <Label for='exam-date'>Date</Label>
                    <Input
                    id='exam-date'
                    type='date'
                    name='date'
                    
                    onChange={form.handleChange}
                    >
                    </Input>
                </FormGroup>
                <Button className='btn btn-warning' type='submit' >Envoyer</Button>
            </Form>
        )
    }

    return (
        <main>
            <h1> {patientDetail.firstName} {patientDetail.name}</h1>
            <h2>Liste des examens</h2>
                {console.log(selectedExam)}
                <ul>
                    {patientDetail.exams.map((exam) => {
                        return <li key={exam._id}>{exam.name} = {exam.value} {exam.units} {new Date(exam.date).toLocaleDateString()}</li>
                    }
                    )}
                </ul>
                <ul>
                    {examsData.map((examCatalog) => {
                        
                        return <li className={examCatalog.name.toLowerCase()} key={examCatalog.index}>
                                    <h3 >{examCatalog.name}</h3>
                                    <Button onClick={() => {setSelectedExam(examCatalog.name.toLowerCase()); console.log(selectedExam)}}>+</Button>
                                    {selectedExam===examCatalog.name.toLowerCase() ? 
                                    htmlForm(form, examCatalog)
                                    :null}
                                </li>
                    }
                    
                    )}
                </ul>
        </main>
    )


};

export default PatientDetail