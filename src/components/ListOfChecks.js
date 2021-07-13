import React, {useState} from "react";
import {Button, ListGroup} from "reactstrap";

const ListOfChecks = (props) => {


    const [selectedChecks, setSelected] = useState([]);


    const onCheckClick = (selected) => {

        const index = selectedChecks.indexOf(selected);
        if (index < 0) {
            selectedChecks.push(selected);
        } else {
            selectedChecks.splice(index, 1);
        }
        setSelected([...selectedChecks]);
        console.log(selectedChecks)
        props.checkHandler(selectedChecks)
    }

    const list = props.checks.map((check) =>
        <Button variant="primary" onClick={() => onCheckClick(check)} active={selectedChecks.includes(check)}>
            {check}
        </Button>
    );
    return (
        <ListGroup>
            Available Checks:
            {list}
        </ListGroup>
    );
}

export default ListOfChecks