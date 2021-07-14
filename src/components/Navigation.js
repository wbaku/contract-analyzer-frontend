import {Container, Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import '../App.css';
import classes from "./Styles.module.css";



const Navigation = (props) => {


    return <div>
        <Container className={classes.navigation} fluid>
        <Navbar light expand="md">
            <NavbarBrand className={classes.brand}>Contract Analyzer</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem className={'App-link'}>
                    <NavLink className={classes.textLink}  to="/rest/"> Rest checks </NavLink>
                </NavItem>
                <NavItem className={'App-link'}>
                    <NavLink to="/queues/"> Queues checks </NavLink>
                </NavItem>
                <NavItem className={'App-link'}>
                    <NavLink to="/reports/"> Reports </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
        </Container>
    </div>
}

export default Navigation