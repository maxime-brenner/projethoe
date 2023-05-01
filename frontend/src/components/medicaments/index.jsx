import axios from "axios";
import { useEffect, useState } from "react";
import { Label, Input, Button, Col, Row } from "reactstrap";

function MedicamentsPage () {

    const [userResearch, setUserResearch] = useState('');
    const [userResearchMedoc, setUserResearchMedoc] = useState([]);
    const [selectedMedoc, setSelectedMedoc] = useState([]);
    const [filteredResearch, setFilteredResearch] = useState([]);

    
    
    const medoc = (research) => {
        axios.get(`http://localhost:3004/api/medicaments?nom=${research}`)
        .then((medoc) => {
            setUserResearchMedoc(medoc.data);
            console.log(userResearchMedoc)
            /* for (const el in userResearchMedoc[0]){
                const filtered = userResearchMedoc[0].reduce((acc, item) => {
                    const moleculeOnly = `${item.composition[0].denominationSubstance} ${item.composition[0].etatCommercialisation}`;
                    console.log('moleculeOnly', moleculeOnly);
                    console.log('acc',acc.includes(moleculeOnly));
                    if (acc.includes(moleculeOnly)===false)
                    {
                        acc.push(moleculeOnly);
                    }
                    console.log('acc',acc);
                    return acc; 
                }, []);
            }; */
        })
        .catch((error) => console.log(error))
    }

    const handleResearch = (e) => {
        setUserResearch(e.target.value);
        medoc(userResearch);
        console.log(userResearch)
    }

    const handleMedoc = (medocName) => {
        setSelectedMedoc([...selectedMedoc, medocName]);
        console.log(selectedMedoc);
    }

    useEffect(() => {medoc()}, [])
    
    return (
        <main>
            <h1>Page des médicaments</h1>
            <Row>
                <Col>
                    <Label>Rechercher un médicament</Label>
                    <Input type="string" style={{width:'50%'}} onChange={handleResearch}></Input>
                    <ul>
                        {(userResearchMedoc[0]) ? userResearchMedoc.map((medoc) => {
                            return <li key={medoc.cis} > {medoc.nom}, {medoc.composition[0].denominationSubstance}, {medoc.composition[0].etatCommercialisation}<Button color='warning' size='sm' onClick={() => handleMedoc(medoc.nom)}>+</Button> </li>
                        })
                            :<p>Pas de molécule de ce nom</p>}
                    </ul>
                </Col>
                <Col>
                        {selectedMedoc.map((medoc) => {
                            return <li key={medoc.indexOf(medoc)}>{medoc}</li>
                        })}
                </Col>
            </Row>
        </main>
    )
}

export default MedicamentsPage;