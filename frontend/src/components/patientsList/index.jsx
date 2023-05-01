import axios from 'axios';
import { useState, useEffect } from 'react';


function PatientsList () {
    const [patients,setPatients] = useState([])

    const getPatients = async () => {
        await axios.get('http://localhost:9090/patient/get/')
        .then((response) => {
            console.log(response.status)
            console.log(response.data)
            setPatients([...response.data.patients])
        })
        .catch((error) => 
        console.log(error))
    };

    useEffect( () => {getPatients()}, []);

    return(
        <main>
            <h1>Liste des patients</h1>
            <ul>
                {patients.map(function (pat){ 
                return <a href={`/patient-id/${pat._id}`}><li key={pat._id}>{pat.name} {pat.firstName} {new Date(pat.birthDate).toLocaleDateString()}</li></a>;
                    }
                )};
            </ul>
        </main>
    )
};

export default PatientsList