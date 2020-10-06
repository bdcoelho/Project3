import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Jumbotron
            title={"The page you are looking for does not exist"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
