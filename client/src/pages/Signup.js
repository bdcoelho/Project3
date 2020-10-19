import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    setButtonDisabled(true)
  };

  const handleSelect = (event) => {
    setAddress(event.target.innerText);
    setButtonDisabled(false)
  };

  const addressTest = addressList.map((address) => {
    return (
      <li key={uuidv4()} className="address-list-item" onClick={handleSelect}>
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
                variant="dark"
                value={address}
                onClick={handleAddressSearch}
                style={{marginTop:"0"}}
                required
              >
                Search
              </Button>
            </Col>
          </Row>
          {addressList.length > 0 ? (
            <div>
              <h4>Please select your address</h4>
                <ul className="address-list" required>{addressTest}</ul>

            </div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicCountryChange">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" value="Australia" disabled />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={buttonDisabled}>
          Sign Up!
        </Button>
        {buttonDisabled?<p className="text-muted mt-3">Please search for and select your address</p>:null}
      </Form>
      <br></br>
      <br></br>
    </Container>
  );
}

export default Signup;
