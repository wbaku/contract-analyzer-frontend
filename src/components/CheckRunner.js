import React, {useState} from "react";
import {Button, Form, Input, InputGroup, InputGroupAddon, Table} from "reactstrap";
import classes from "./Styles.module.css";


const CheckRunner = (props) => {

    let checkToRun = props.checkToRun

    const initialMessage = 'No checks were run yet';

    const [report, setReport] = useState(initialMessage);
    const [host, setHost] = useState(['Host unknogiwn']);

    async function runCheck() {

        let response;
        if (String(checkToRun).length === 0) {
            alert("Please choose checks to run first!")
            return;
        }
        console.log(checkToRun.length)

        if (checkToRun.length === 1) {
            console.log("im in runCheck: " + checkToRun)
            response = await fetch('/checks/' + checkToRun + '/run?url=' + host, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        } else {

            response = await fetch('/aggregatedChecks/run?namesOfChecks=' + checkToRun + '&url=' + host, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

        }

        const dataReceived = await response.json();
        setReport(JSON.stringify(dataReceived, null, 2)
            .replaceAll(/}|{|"/g, '')
        )
        // console.log(report)
    }


    const userInputHandler = (event) => {
        setHost(event.target.value)
    }

    return (
        <div>
            <Form>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button className={classes.button} onClick={runCheck}>Run
                        check</Button></InputGroupAddon>
                    <Input type="text" name="host" id="dupa" placeholder="Please enter host"
                           onChange={userInputHandler}/>
                </InputGroup>
            </Form>

            <Table>

<pre>
    {report.includes('id') ? <b>Your check was run and produced the following report:</b> : null}
    {report}
</pre>
                {/*{report.map((data, index) => {*/}
                {/*        return index % 2 === 0 || index === 0 ? (*/}
                {/*            <tr>*/}
                {/*                <td>{data}</td>*/}
                {/*            </tr>) : <td>{data}</td>;*/}
                {/*    }*/}
                {/*)*/}
                {/*}*/}
            </Table>
        </div>
    )
}

export default CheckRunner