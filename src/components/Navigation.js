import {Container, Nav, Navbar, NavbarBrand, Button} from "reactstrap";
import {NavLink} from "react-router-dom";
import '../App.css';
import classes from "./Styles.module.css";



const Navigation = (props) => {


    return <div>
        <Container className={classes.navigation} fluid>
        <Navbar light expand="md">
            <NavbarBrand className={classes.brand}>Contract Analyzer</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <Button className={classes.button} tag={NavLink} to="/rest/">
                    Rest checks
                </Button>
                <Button className={classes.button} tag={NavLink} to="/queues/" >
                    Queues checks
                </Button>
                <Button className={classes.button} tag={NavLink} to="/reports/" >
                    Reports
                </Button>
            </Nav>
        </Navbar>
        </Container>
    </div>
}

export default Navigation