import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

function ExamsCatalogPage () {
    const [exams, setExams] = useState([])

    const getExams = () => {
        axios.get(`http://localhost:9090/biologie/all-exams/`)
        .then ((res) => {
            console.log(res.status);
            setExams(res.data.exam);
        })
        .catch ((err) => console.log(err));
    };

    useEffect(() => {getExams()}, []);

    return (
        <main>
            <h1>Liste des biologies</h1>
            <Row>
                <ul>
                    {exams.map((item) => {
                        console.log(exams);
                        return <li key={item._id}>{item.name}</li>;
                    })}
                </ul>
            </Row>
            <Row>
                
            </Row>
        </main>
    )
};

export default ExamsCatalogPage;