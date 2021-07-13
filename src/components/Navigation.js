import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {useState} from "react";
import {Collapse} from "reactstrap";
import {Link} from "react-router-dom";
import Reports from "./Reports";
import { Redirect } from "react-router-dom";


const Navigation = (props) => {

    const [isOpen, setIsOpen] = useState(false);


    return <div>

        <Navbar color="light" light expand="md">
            <NavbarBrand>Contract Analyzer</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <Link to="/rest/">Rest checks </Link>
                </NavItem>

                <NavItem>
                    <Link to="/queues/">Queues checks </Link>
                </NavItem>

                <NavItem>
                    <Link to="/reports/">Reports</Link>
                </NavItem>

            </Nav>
        </Navbar>
    </div>
}

export default Navigation