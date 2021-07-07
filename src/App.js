import './App.css';
import ListOfChecks from "./components/ListOfChecks";
import React, {useState} from "react";

function App() {


        const [listOfChecks, setListOfChecks] = useState([])

        async function fetchTests() {


            const response = await fetch('/restContractChecks')
            const data = await response.json();

            setListOfChecks(data.listOfChecks)

        }

        fetchTests()


    return (
        <div className="App">
            <ListOfChecks checks={listOfChecks}></ListOfChecks>
        </div>
    );

}

export default App;
