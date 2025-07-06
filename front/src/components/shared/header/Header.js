import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import Languages from './Languages'
import { useTranslation } from 'react-i18next';
const Header = () => {

    const { t} = useTranslation();

    const {home, dictations, aboutus, supportus, login, register } = t("Header")
 
return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faPencil}/>Mingui
            </Navbar.Brand>
            <Languages/>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">{home}</NavLink>
                    <NavLink className ="nav-link" to="/dictations">{dictations}</NavLink>      
                    <NavLink className ="nav-link" to="/about-us">{aboutus}</NavLink>      
                    <NavLink className ="nav-link" to="/support-us">{supportus}</NavLink>      
                </Nav>
                <Button variant="outline-info" className="me-2">{login}</Button>
                <Button variant="outline-info">{register}</Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header