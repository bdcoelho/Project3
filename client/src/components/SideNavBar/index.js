import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Sidenav, Nav, Icon, Dropdown } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { Link } from "react-router-dom";
// import 'rsuite/dist/styles/rsuite-dark.css';

const SideNavBar = () => (
    <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1" className="side-nav">
      <Sidenav.Body>
        <Nav>
          <Nav.Item  componentClass={Link} to="/Home" eventKey="1" icon={<Icon icon="home" />}>
            Home
          </Nav.Item>

          <Dropdown eventKey="1" title="My Tools" icon={<Icon icon="wrench" />}>
            <Dropdown.Item componentClass={Link} to="/View" eventKey="1-1">
              View/Edit
            </Dropdown.Item>
            <Dropdown.Item componentClass={Link} to="/Add" eventKey="1-2">Add New</Dropdown.Item>
          </Dropdown>

          <Dropdown
            eventKey="2"
            title="Find Tools"
            icon={<Icon icon="search" />}
          >
            <Dropdown.Item componentClass={Link} to="/Find" eventKey="2-1">
              Find
            </Dropdown.Item>
          </Dropdown>

          {/* <Dropdown
            eventKey="4"
            title="Settings"
            icon={<Icon icon="gear-circle" />}
          >
            <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
            <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
            <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
          </Dropdown> */}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
);

export default SideNavBar;
