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
import { jwtDecode } from 'jwt-decode'; // ✅ correct


const Header = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Sync token state across tabs/windows
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    // Decode JWT to get user info (e.g., email)
    const getUserEmail = (token) => {
        try {
            const decoded = jwtDecode(token);
            console.log("token")
            console.log(decoded)
            return decoded.sub || decoded.email;
        } catch {
            return null;
        }
    };

    const { t } = useTranslation();
    const { home, dictations, aboutus, supportus, login, register, logout } = t("Header");

    const userEmail = token ? getUserEmail(token) : null;

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

                    {/* Right side auth buttons */}
                    {token ? (
                        <div className="d-flex align-items-center">
                            {userEmail && (
                                <span className="text-white me-3">
                                    {userEmail}
                                </span>
                            )}
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
