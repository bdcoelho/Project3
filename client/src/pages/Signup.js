import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([1, 2, 3]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
      address,
    };

    axios
      .post("/api/signup", data)
      .then(() => {
        console.log("User Created");
        window.location = "/Home";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddressSearch = (event) => {
    event.preventDefault();
    const address = { value: event.target.value };
    axios
      .post("/api/addressSearch", address)
      .then((res) => {
        setAddressList(res.data.predictions);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUserChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleLiClick = (event) => {
    setAddress(event.target.innerText);
  };

  const addressTest = addressList.map((address) => {
    return (
      <li className="address-list-item" onClick={handleLiClick}>
        {address.description}
      </li>
    );
  });
  return (
    <Container>
      <Form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleUserChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search for your address"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                value={address}
                onClick={handleAddressSearch}
                required                
              >
                Search
              </Button>
            </Col>
          </Row>
          <ul className="address-list">Select your Address {addressTest}</ul>
        </Form.Group>


        <Form.Group controlId="formBasicCountryChange">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" value="Australia" disabled />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>
    </Container>
  );
}

export default Signup;
