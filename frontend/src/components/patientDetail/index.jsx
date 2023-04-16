import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { array } from 'joi';

function PatientDetail () {
    const params = useParams();
    const patientId = params.patientId;

    const [patientDetail, setPatientDetail] = useState({
        name: '',
        firstName:'',
        birthDate:'',
        exams:[{}],
    }); 

    useEffect (() => {getPatient()}, []);

    const getPatient = async () => {
        const response = await axios.get(`http://localhost:9090/patient/get/${patientId}`);
        setPatientDetail(response.data.patient);
        console.log(patientDetail.exams[0]);
    };

    return (
        <main>
            <h1> {patientDetail.firstName} {patientDetail.name}</h1>
            <h2>Liste des examens</h2>
                <ul>
                    {patientDetail.exams.map((exam) => {
                        return <li key={exam._id}>{exam.name} = {exam.value}{exam.units}{Date.parse(exam.date)}</li>
                    }
                    )}
                </ul>
        </main>
    )


};

export default PatientDetail