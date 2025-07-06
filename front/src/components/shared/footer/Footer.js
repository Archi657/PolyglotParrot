import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const { home, dictations, aboutus, supportus } = t("Header");

  return (
    <Navbar bg="dark" variant="dark" className="mt-4 py-3 border-top border-secondary">
      <Container fluid className="d-flex flex-column align-items-center">
        <Navbar.Brand style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faPencil} /> Mingui
        </Navbar.Brand>
        <Nav className="text-center">
          <NavLink className="nav-link text-light" to="/">
            {home}
          </NavLink>
          <NavLink className="nav-link text-light" to="/dictations">
            {dictations}
          </NavLink>
          <NavLink className="nav-link text-light" to="/about-us">
            {aboutus}
          </NavLink>
          <NavLink className="nav-link text-light" to="/support-us">
            {supportus}
          </NavLink>
        </Nav>
        <div className="text-secondary mt-2">&copy; {new Date().getFullYear()} Mingui. All rights reserved.</div>
      </Container>
    </Navbar>
  );
};

export default Footer;
