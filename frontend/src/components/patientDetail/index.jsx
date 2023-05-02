import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import examsData from '../../features/examsData';
import {Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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

    const [orderedExams, setOrderedExams] = useState({});
    const [selectedExam, setSelectedExam] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const form = useFormik(examForm());

    useEffect (() => {getPatient()}, [isFetching]);

    const getPatient = async () => {
        const response = await axios.get(`http://localhost:9090/patient/get/${patientId}`);
        const patient = response.data.patient;
        setPatientDetail(patient);

        const orderingExams = patient.exams.reduce((acc, obj) => {
                var cle = obj.name;
                if (!acc[cle]) {
                    acc[cle] = [];
                }
                acc[cle].push(obj);
                return acc;
            }, {});
         
        setOrderedExams(orderingExams);
        console.log(orderedExams); 
        };

    const handleSubmit = () => {
        setIsFetching(true);
        form.handleSubmit();
        setIsFetching(false);
    }


    const htmlForm = (form, examCatalog) => {
        form.values.name=examCatalog.name;
        form.values.patient=patientDetail._id;
        console.log(form.values)
        return (
                <Form className='exam-form' onSubmit={handleSubmit}>
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
                    <Button color='danger' size='sm' type='submit' >Envoyer</Button>
                </Form>
        )   
    }

    const deleteExamOnClick = async (patientId, examId) => {
        setIsFetching(true);
        await axios.patch(`http://localhost:9090/patient/delete/exam/${patientId}/?examId=${examId}`);
        setIsFetching(false);
    };

    return (
        <main>
            <h1> {patientDetail.firstName} {patientDetail.name}</h1>
            <Row>
                <Col>
                    
                    <h2>Liste des examens</h2>
                        <ul>
                            {Object.entries(orderedExams).map(([key]) => {
                                const latest = orderedExams[key][0];
                                console.log("latest",key);
                                return (<li key={key.toLowerCase()}>{key} = {latest.value} {latest.units} {new Date(latest.date).toLocaleDateString()}<Button color='danger' size='sm' onClick={() => {deleteExamOnClick(patientDetail._id, latest._id)} }>-</Button></li>)
                            })
                            }
                        </ul>
                        <ul>
                            {examsData.map((examCatalog) => {
                                
                                return <li className={examCatalog.name.toLowerCase()} key={examCatalog.index}>
                                            <h3 >{examCatalog.name}</h3>
                                            <Button color='warning' size='sm' onClick={() => {setSelectedExam(examCatalog.name.toLowerCase())}}>+</Button>
                                            {selectedExam===examCatalog.name.toLowerCase() ? 
                                            htmlForm(form, examCatalog)
                                            :null}
                                        </li>
                            }
                            
                            )}
                        </ul>
                </Col>
                <Col>
                    <LineChart width={600} height={300} data={patientDetail.exams}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </Col>
            </Row>
        </main>
    )


};

export default PatientDetail