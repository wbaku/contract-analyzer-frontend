import './App.css';
import ListOfChecks from "./components/ListOfChecks";
import React, {useCallback, useEffect, useState} from "react";
import CheckRunner from "./components/CheckRunner";
import Navigation from "./components/Navigation";
import {Redirect, Route} from "react-router-dom";
import ReportRunner from "./components/reports/ReportRunner";
import classes from "./components/Styles.module.css";

function App() {

    const [listOfChecks, setListOfChecks] = useState(['Loading checks...'])

    const [checksToRun, setChecksToRun] = useState([''])

    const [error, setError] = useState(null)


    const [reports, setReports] = useState([]);

    const fetchListOfChecks = useCallback(async () => {

        try {
            const response = await fetch('/restContractChecks')
            if(!response.ok) {
                throw new Error('Error fetching the list of checks')
            }
            const dataReceived = await response.json();

            setListOfChecks(dataReceived.listOfChecks)
        } catch (error) {
            setError(error.message)
        }

    }, [])

    const checkHandler = check => {

        console.log("im in check handler " + check)
        setChecksToRun(check)
    }

    const reportsHandler = reports => {
        setReports(reports);
    }

    useEffect(() => {
        fetchListOfChecks();
    },[fetchListOfChecks]);

    return (
        <div className={classes.App}>
            <Navigation/>
            <Route path={'/'} exact>
                <Redirect to={'/rest'}/>
            </Route>

            <Route path={'/rest'}>

                <ListOfChecks checks={listOfChecks} checkHandler={checkHandler}/>
                <CheckRunner checkToRun={checksToRun}/>
                {error && <p>{error}</p>}

            </Route>
            <Route path={'/reports'}>
                <ReportRunner reportToRun={reports} reportsHandler={reportsHandler}/>
            </Route>
        </div>
    );

}

export default App;
