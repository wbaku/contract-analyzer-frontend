import React from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

const ListOfChecks = (props) => {

    const list = props.checks.map((check, index) =>

        <ListGroup>
        <ListGroupItem  key={index}>
            {check}
        </ListGroupItem>
        </ListGroup>
    );

    return (
        <ListGroup>
            Available Checks:
            {list}
        </ListGroup>
    );
}

export default ListOfChecks
