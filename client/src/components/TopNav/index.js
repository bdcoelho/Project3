import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Navbar, Nav } from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";


function NavHeader() {
  const { firstName, lastName } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav.Link as={Link} to ="/Home" className="mr-auto">
          {firstName
            ? `Welcome, ${firstName + " " + lastName}!`
            : "Howdy Neighbour!"}
        </Nav.Link>
        <Nav.Link className="nav-link" href="/logout">
          Logout
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavHeader;
