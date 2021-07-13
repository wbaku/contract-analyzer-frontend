import './App.css';
import ListOfChecks from "./components/ListOfChecks";
import React, {useEffect, useState} from "react";
import CheckRunner from "./components/CheckRunner";
import Navigation from "./components/Navigation";
import Reports from "./components/Reports";

function App() {


    const [listOfChecks, setListOfChecks] = useState(['Loading checks...'])

    const [checksToRun, setChecksToRun] = useState([''])

    async function fetchListOfChecks() {

        const response = await fetch('/restContractChecks')
        const dataReceived = await response.json();
        setListOfChecks(dataReceived.listOfChecks)
    }

    const checkHandler = check => {

        console.log("im in check handler " + check)
        setChecksToRun(check)
    }

    useEffect(() => {
        fetchListOfChecks();
    },);

    return (
        <div className="App">
            <Navigation></Navigation>
            <h1 className={"app-header"}>Contract-Analyzer</h1>


            <ListOfChecks checks={listOfChecks} checkHandler={checkHandler}/>
            <CheckRunner checkToRun={checksToRun}/>
            <Reports></Reports>
        </div>
    );

}

export default App;
