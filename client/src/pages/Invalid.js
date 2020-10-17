import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Jumbotron from "../components/Jumbotron";
import SideNavBar from "../components/SideNavBar";

function NoMatch() {
  return (
    <Container fluid style={{ paddingLeft: "0"}}>
      <Row>
        <Col md={2} className="pr-0">
          <SideNavBar />
        </Col>
        <Col md={10} style={{paddingLeft:"0",paddingRight:"0"}}>
          <Jumbotron title={"The page you are looking for does not exist"} />
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
