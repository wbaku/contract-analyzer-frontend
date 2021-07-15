import React, { useState } from "react";
import {Button, Form, Input, InputGroup, Card, ListGroup, ListGroupItem} from "reactstrap";
import {useKeycloak} from "@react-keycloak/web";

const ReportRunner = props => {

    let reportToRun = props.reportToRun;

    const initialMessage = 'No reports were created yet';

    const [reports, setReports] = useState([]);

    const [reportId, setReportId] = useState('');

    const {keycloak, initialized} = useKeycloak();


    async function showReports() {
        let response = await fetch('/reports', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + keycloak.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const allReports = await response.json();
        // setReports(JSON.stringify(dataReceived, null, 2)
        //         .replaceAll(/}|{|"/g, '')
        // )
        setReports(Object.values(allReports))
    }

    async function getReportById () {
        console.log(reportId)
        let response = await fetch('/reports/' + reportId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const reportWithId = await response.json();
        console.log(reportWithId)
        setReports(reportWithId);
    }

    const userInputHandler = event => {
        console.log(reportId)
        setReportId(parseInt(event.target.value));
        // console.log(event.target.value, reportId)
         getReportById();
    }

    return (
        <div>
            <Form>
                <Button variant="primary" onClick={showReports}>Show all reports</Button>
            </Form>
            <Form>
                <InputGroup>
                    <Button variant="primary" onClick={userInputHandler}>Show report with id</Button>
                    <Input type="number"
                           placeholder="Please enter id"
                           value={reportId}
                           onChange={userInputHandler}/>
                </InputGroup>
            </Form>
            <ListGroup>
            {reports.includes('id') ? <b>Your check was run and produced the following report:</b> : null}
                {reports.map(report =>
                    <Card><ListGroupItem>{JSON.stringify(report, null, 2)
                             .replaceAll(/}|{|"/g, '')}
                    </ListGroupItem></Card>
                )}
            </ListGroup>
        </div>);
}

export default ReportRunner;