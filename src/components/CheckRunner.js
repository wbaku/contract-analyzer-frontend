import React, {useState} from "react";
import {Button, Card, CardBody, Form, Input, InputGroup, InputGroupAddon} from "reactstrap";


const CheckRunner = (props) => {

    const checkToRun = props.checkToRun

    const [report, setReport] = useState(['No checks were run']);
    const [host, setHost] = useState(['Host unknown']);


    async function runCheck() {

        console.log("im in runCheck: " + checkToRun)
        const response = await fetch('/checks/' + checkToRun + '/run?url='+host, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Access-Control-Allow-Origin': host,
                'Content-Type': 'application/json'
            },
            // mode:'cors'
        })
        const dataReceived = await response.json();

        setReport(JSON.stringify(dataReceived))
    }


    const userInputHandler = (event) => {
        setHost(event.target.value)
    }

    return (
        <div>
            <Form>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button onClick={runCheck}>Run check</Button></InputGroupAddon>
                    <Input type="text" name="host" id="dupa" placeholder="Please enter host"
                           onChange={userInputHandler}/>
                </InputGroup>
            </Form>
            <Card>
                <CardBody>
                    {report}
                </CardBody>
            </Card>
        </div>
    )
}

export default CheckRunner