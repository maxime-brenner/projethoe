import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import codeForm from "../../forms/codeForm.ts";
import {Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";

function CodePage () {
    const [codeList, setCodeList] = useState([])

    const form = useFormik(codeForm())

    const htmlForm = (form) => {
        return (
                <Form className='code-form' onSubmit={form.handleSubmit}>
                    <FormGroup>
                        <Label for='code'>Code</Label>
                        <Input
                        id='code'
                        type='text'
                        placeholder='entrez votre code'
                        name='code'
                        value={form.values.code}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="code-name-form">Nom</Label>
                        <Input
                        id='name'
                        type='text'
                        placeholder='entrez votre nom du code'
                        name='name'
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}>
                        </Input>
                    </FormGroup>

                    
                    <Button className='btn btn-warning' type='submit' >Envoyer</Button>
                </Form>
        )   
    };

    const getCodes = async () => {
        try 
        {
           const fetchCodeList = await axios.get('http://localhost:9090/cim/get/');
           console.log(fetchCodeList.status);
           console.log(fetchCodeList.data.codes);
           setCodeList(fetchCodeList.data.codes);
           console.log(codeList);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {getCodes()}, [])

    return (
        <main>
            <section className="code-list">
                <ul>
                    {codeList.map((code) => {
                        return <li key={code._id}><strong>{code.code}</strong> {code.name}</li>
                    }
                    )}
                </ul>
            </section>
            <section>
                {htmlForm(form)}
            </section>
        </main>
    )
}

export default CodePage;