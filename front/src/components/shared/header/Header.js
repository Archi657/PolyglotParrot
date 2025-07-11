import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Languages from './Languages';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
//import { jwtDecode } from 'jwt-decode';
import { Avatar } from "@mui/material";

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    useEffect(() => {
        const updateFromStorage = () => {
            const tokenFromStorage = localStorage.getItem("token");
            const userFromStorage = localStorage.getItem("username");

            setToken(tokenFromStorage);
            setUsername(userFromStorage);

        };

        updateFromStorage(); // initial load
        window.addEventListener("storage", updateFromStorage);
        console.log(username)
        return () => {
            window.removeEventListener("storage", updateFromStorage);
        };

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername("");
    };

    const { t } = useTranslation();
    const { home, dictations, aboutus, supportus, login, register, logout } = t("Header");

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand style={{ color: 'gold' }}>
                    <FontAwesomeIcon icon={faPencil} /> Mingui
                </Navbar.Brand>
                <Languages />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <NavLink className="nav-link" to="/">{home}</NavLink>
                        <NavLink className="nav-link" to="/dictations">{dictations}</NavLink>
                        <NavLink className="nav-link" to="/about-us">{aboutus}</NavLink>
                        <NavLink className="nav-link" to="/support-us">{supportus}</NavLink>
                    </Nav>

                    {token ? (
                        <div className="d-flex align-items-center">
                            {username && (
                                <span className="text-white me-3">
                                    {username}
                                </span>
                            )}
                            <NavLink to={`/profile/${encodeURIComponent(username)}`} className="me-3">
                                <Avatar alt={username} src="/static/images/avatar/3.jpg" />
                            </NavLink>
                            <Button variant="outline-warning" onClick={handleLogout}>
                                {logout || "Logout"}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button variant="outline-info" className="me-2">{login}</Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button variant="outline-info">{register}</Button>
                            </NavLink>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


export default Header;
