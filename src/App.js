import './App.css';
import ListOfChecks from "./components/ListOfChecks";
import React, {useEffect, useState} from "react";

function App() {


    const [listOfChecks, setListOfChecks] = useState(['Loading checks...'])

    async function fetchTests() {


        const response = await fetch('/restContractChecks')
        const dataReceived = await response.json();

        setListOfChecks(dataReceived.listOfChecks)

    }
    useEffect(() => {
        fetchTests()
    });


    return (
        <div className="App">
            <h1 className={"app-header"}>Contract-Analyzer</h1>

            <ListOfChecks checks={listOfChecks}></ListOfChecks>
        </div>
    );

}

export default App;
