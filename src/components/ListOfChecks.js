import React, {useState} from "react";
import {Badge, Button, ListGroup} from "reactstrap";
import classes from "./Styles.module.css";

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
        <Button className={classes.button} onClick={() => onCheckClick(check)} active={selectedChecks.includes(check)}>
            {check}<Badge>{selectedChecks.filter(x=>x===check).length}</Badge>
        </Button>
    );
    return (
        <ListGroup className={classes.brand}>
            <p> Available Checks
            </p>
            {list}
        </ListGroup>
    );
}

export default ListOfChecks