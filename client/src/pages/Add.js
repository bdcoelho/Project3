import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";


function Add() {
  const { id, email, firstName, lastName, lng, lat } = useContext(UserContext);

  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [DailyPrice, setDailyPrice] = useState("");


  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event.target.value);
  };
  return (
    <Row>
      <Col md={2} className="pr-0">
        <SideNavBar />
      </Col>
      <Col md={9}>
      <Container>
      <Form className="add-asset-form" autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleCategoryChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>
    </Container>
      </Col>
    </Row>

  );
}

export default Add;
