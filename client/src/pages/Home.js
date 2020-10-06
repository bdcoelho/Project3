import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row, Container } from "react-bootstrap";

function Home() {
  const { firstName, lastName } = useContext(UserContext);

  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <SideNavBar />
      </div>
      <div className="page-content-wrapper">
        <Container fluid="lg">
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
