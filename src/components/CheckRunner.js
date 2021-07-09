import React, {useState} from "react";
import {Button, Form, Input, InputGroup, InputGroupAddon, Table} from "reactstrap";


const CheckRunner = (props) => {

    const checkToRun = props.checkToRun

    const [report, setReport] = useState(['No checks were run yet']);
    const [host, setHost] = useState(['Host unknown']);


    async function runCheck() {


        console.log("im in runCheck: " + checkToRun)
        const response = await fetch('/checks/' + checkToRun + '/run?url=' + host, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Access-Control-Allow-Origin': host,
                'Content-Type': 'application/json'
            },
            // mode:'cors'
        })
        const dataReceived = await response.json();
        setReport(JSON.stringify(dataReceived,null, 2)
            .replaceAll(/}|{|"/g, '')
            // .split(/,/g)
        )
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
            <Table>

<pre>
    {report.includes('id') ? <b>Your check was run and produced the following report:</b> : null }
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