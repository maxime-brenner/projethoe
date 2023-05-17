import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import examsData from '../../features/examsData';
import {Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import examForm from '../../forms/forms.ts';
import MedicamentsPage from '../medicaments';

function PatientDetail () {
    const params = useParams();
    const patientId = params.patientId;

    const [patientDetail, setPatientDetail] = useState({
        name: '',
        firstName:'',
        birthDate:'',
        exams:[{data:[{value:null}]}],
    }); 

    const [orderedExams, setOrderedExams] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [examsCatalog, setExamsCatalog] = useState([]);
    const [selectedExamCatalog, setSelectedExamCatalog] = useState({});

    const form = useFormik(examForm());

    useEffect (() => {getPatient()}, [isFetching]);
    useEffect (() => {getExamsCatalog()}, []);

    const getPatient = async () => {
        const response = await axios.get(`http://localhost:9090/patient/get/${patientId}`);
        const patient = response.data.patient;
        setPatientDetail(patient);
        patient.exams.map((exam) => {
            exam.data.sort((a, b) => {return new Date(a.date)- new Date(b.date)})
        });
         
        /* setOrderedExams(orderingExams);
        console.log(orderedExams);  */
        };

    const getExamsCatalog = async () => {
        const response = await axios.get(`http://localhost:9090/biologie/all-exams/`);
        setExamsCatalog(response.data.exam);
        console.log(examsCatalog);
       }

    const handleSubmit = () => {
        setIsFetching(true);
        form.handleSubmit();
        setIsFetching(false);
    }

    const handleSelectedExamCatalog = e => {
        const selectedExam = examsCatalog.find(el => e.target.value === el.name);
        if (selectedExam) {
            setSelectedExamCatalog(selectedExam);
        } else {
            setSelectedExamCatalog({});
        };
        console.log('selectedExam', selectedExamCatalog);
    }


    const htmlForm = (form, examCatalog) => {
        form.values.name=selectedExamCatalog.name;
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
                            {/* {Object.entries(orderedExams).map(([key]) => {
                                const latest = orderedExams[key][0];
                                console.log("latest",key);
                                return (<li key={key.toLowerCase()}>{key} = {latest.value} {latest.units} {new Date(latest.date).toLocaleDateString()}<Button color='danger' size='sm' onClick={() => {deleteExamOnClick(patientDetail._id, latest._id)} }>-</Button></li>)
                            })
                            } */}
                            {patientDetail.exams.map((exam) => {
                                console.log('exam',exam);
                                console.log('ordered exam', orderedExams)
                                return <li key={exam._id}>{exam.name} {exam.data.slice(-1)[0].value}</li>;
                            })}
                        </ul>
                    <h2>Ajouter un examen</h2>
                        <select onChange={(e) => handleSelectedExamCatalog(e)}>
                            <option></option>
                            {examsCatalog.map((exam) => {
                                
                                return <option key={exam._id}>{exam.name}</option>
                            })}
                        </select>
                        <h3>{selectedExamCatalog.name ? selectedExamCatalog.name : "Sélectionnez un examen"}</h3>
                        {selectedExamCatalog.name ?  htmlForm(form, selectedExamCatalog) : null }
                </Col>
                <Col>
                    <LineChart width={600} height={300} >
                        {patientDetail.exams.map((exam) => {
                            return <Line data={exam.data} type="monotone" dataKey="value" stroke="#8884d8" />;
                        })}
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </Col>
            </Row>
            <Row>
                <h2>Liste de straitements</h2>
                <ul>
                {patientDetail.treatment ? patientDetail.treatment.map((medoc, id) => {
                    const tab=[];
                    for (const poso of medoc.posologie){
                        const verbose=String(poso.quantity)+" "+medoc.formeGalenique+" "+poso.moment;
                        console.log("verbose", verbose, String(poso.quantity), poso.moment)
                        tab.push(verbose);
                    }
                   const posoVerbose = tab.join();
                   return <li key={id}>{medoc.name}: {posoVerbose}</li>
                }) :null}
                </ul>
            </Row>
            <Row>
                <MedicamentsPage />
            </Row>
        </main>
    )


};

export default PatientDetail