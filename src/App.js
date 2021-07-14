import './App.css';
import ListOfChecks from "./components/ListOfChecks";
import React, {useEffect, useState} from "react";
import CheckRunner from "./components/CheckRunner";
import Navigation from "./components/Navigation";
import {Redirect, Route} from "react-router-dom";
import ReportRunner from "./components/reports/ReportRunner";

function App() {

    const [listOfChecks, setListOfChecks] = useState(['Loading checks...'])

    const [checksToRun, setChecksToRun] = useState([''])

    const [reports, setReports] = useState([]);

    async function fetchListOfChecks() {

        const response = await fetch('/restContractChecks')
        const dataReceived = await response.json();
        setListOfChecks(dataReceived.listOfChecks)
    }

    const checkHandler = check => {

        console.log("im in check handler " + check)
        setChecksToRun(check)
    }

    const reportsHandler = reports => {
        setReports(reports);
    }

    useEffect(() => {
        fetchListOfChecks();
    },);

    return (
        <div className="App">
            <Navigation/>
            <Route path={'/'} exact>
                <Redirect to={'/rest'}/>
            </Route>

            <Route path={'/rest'}>

                <ListOfChecks checks={listOfChecks} checkHandler={checkHandler}/>
                <CheckRunner checkToRun={checksToRun}/>

            </Route>
            <Route path={'/reports'}>
                <ReportRunner reportToRun={reports} reportsHandler={reportsHandler}/>
            </Route>
        </div>
    );

}

export default App;
