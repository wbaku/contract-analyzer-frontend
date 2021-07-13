import {Container, Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";
import '../App.css';



const Navigation = (props) => {


    return <div>
        <Container fluid>
        <Navbar color="light" light expand="md">
            <NavbarBrand>Contract Analyzer</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem className={'App-link'}>
                    <NavLink to="/rest/"> Rest checks </NavLink>
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