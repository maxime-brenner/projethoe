import axios from "axios";
import { useEffect, useState } from "react";
import {Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { useFormik } from 'formik';
import prescriptionForm from "../../forms/prescriptionForm.ts";
import { func } from "joi";

function MedicamentsPage () {

    const [userResearch, setUserResearch] = useState('');
    const [userResearchMedoc, setUserResearchMedoc] = useState([]);
    const [selectedMedoc, setSelectedMedoc] = useState({});
    const [treatment, setTreament] = useState([]);

    const form = useFormik(prescriptionForm());
    
    const medoc = (research) => {
        if (research && research.length>3){
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
        };
    }

    const handleResearch = (e) => {
        setUserResearch(e.target.value);
        medoc(userResearch);
        console.log(userResearch)
    }

    const handleMedoc = (medocName) => {
        setSelectedMedoc(medocName);
        console.log("selectedMedoc",selectedMedoc);
    }

    const handlePosoChange = (e) => {
        const array=form.values.posologie;
        const exist = array.find(el => el.moment===e.target.name);
        exist ? exist.quantity=e.target.value
        :form.values.posologie.push({moment:e.target.name, quantity:e.target.value})
        console.log(form.values.posologie)
    }

    const handleTreament = (e) => {
        setTreament([...treatment, form.values]);
        console.log("treatment",treatment);
        e.preventDefault();
    }

    const prescriptionFormHTML = (form, selectedMedoc) => {
        form.values.name=selectedMedoc.nom;
        form.values.doseUnitaire=selectedMedoc.nom.match('\\d+')[0];
        form.values.formeGalenique=selectedMedoc.composition[0].etatCommercialisation;
        const frequency = ["/jour", "/semaine", "/mois", "/3mois"];
        console.log(form.values)
        return(
            <Form className="prescription-form" onSubmit={handleTreament}>
                <h3>{selectedMedoc.nom}</h3>
                <FormGroup>
                    <h3>Posologie</h3>
                    <Row>
                        <Col>
                            <Label for="matin">Matin</Label>
                            <Input
                            id="matin"
                            type="number"
                            name='matin'
                            style={{width:"20%"}}
                            onChange={(e) => handlePosoChange(e)}
                            >
                            </Input>
                        </Col>
                        <Col>
                            <Label for="midi">Midi</Label>
                            <Input
                            id="midi"
                            type="number"
                            name='midi'
                            style={{width:"20%"}}
                            onChange={(e) => handlePosoChange(e)}
                            >
                            </Input>
                        </Col>
                        <Col>
                            <Label for="soir">Soir</Label>
                            <Input
                            id="soir"
                            type="number"
                            name='soir'
                            style={{width:"20%"}}
                            onChange={(e) => handlePosoChange(e)}
                            >
                            </Input>
                        </Col>
                        <Col>
                            <Label for="nuit">Nuit</Label>
                            <Input
                            id="nuit"
                            type="number"
                            name='nuit-value'
                            style={{width:"20%"}}
                            onChange={(e) => handlePosoChange(e)}
                            >
                            </Input>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <h3>Fréquence</h3>
                    <select name="frequency" onChange={form.handleChange}>
                        <option ></option>
                        {frequency.map((freq, id) => {
                            return <option key={id}>{freq}</option>
                        })}
                    </select>
                </FormGroup>
                <Button color='danger' size='sm' type='submit'>Envoyer</Button>
            </Form>
        )
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
                            return <li key={medoc.cis} > {medoc.nom}, {medoc.nom.match('\\d+')[0]}, {medoc.composition[0].denominationSubstance}, {medoc.composition[0].etatCommercialisation}<Button color='warning' size='sm' onClick={() => handleMedoc(medoc)}>+</Button> </li>
                        })
                            :<p>Pas de molécule de ce nom</p>}
                    </ul>
                </Col>
                <Row>
                    <Col>
                        <ul>
                            {treatment.map((med) => {
                                return <li>{med.name} Prendre {med.posologie.map((el) => <nobr><p>{el.quantity} comprimé(s) le {el.moment} </p></nobr>)}{med.frequency}</li>
                            })}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {selectedMedoc.nom ? prescriptionFormHTML(form, selectedMedoc):null}
                    </Col>
                </Row>
                
            </Row>
        </main>
    )
}

export default MedicamentsPage;