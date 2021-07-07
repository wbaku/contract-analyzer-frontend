import React from "react";

const ListOfChecks = (props) => {

    const list = props.checks.map((checks, index) =>

        <li key={index}>
            {checks.toString()}
        </li>
    );

    return list;

}

export default ListOfChecks
