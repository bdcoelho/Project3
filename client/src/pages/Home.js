import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row} from "react-bootstrap";

function Home() {
  const { firstName, lastName } = useContext(UserContext);
  return (
    <Row>
      <Col md={2} className="pr-0">
        <SideNavBar />
      </Col>
      <Col md={9}>
 Home Page
      </Col>
    </Row>

  );
}

export default Home;
