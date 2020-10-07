import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Sidenav, Nav, Icon, Dropdown } from "rsuite";
import 'rsuite/dist/styles/rsuite-default.css';
import {Link} from "react-router-dom";
// import 'rsuite/dist/styles/rsuite-dark.css';


  const SideNavBar = () => (
    <div style={{ width: 250 }}>
      <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1" className="side-nav">
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
              User Group
            </Nav.Item>
            <Dropdown
              eventKey="3"
              title="My Tools"
              icon={<Icon icon="wrench" />}
            >
              <Dropdown.Item componentClass={Link} to="/View" eventKey="3-1">View/Edit</Dropdown.Item>
              <Dropdown.Item eventKey="3-2">Add New</Dropdown.Item>

            </Dropdown>
            <Dropdown
              eventKey="4"
              title="Settings"
              icon={<Icon icon="gear-circle" />}
            >
              <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
              <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
              <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
              <Dropdown.Menu eventKey="4-5" title="Custom Action">
                <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>

);


export default SideNavBar;
