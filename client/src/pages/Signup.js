import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNum, setStreetnum] = useState("");
  const [streetName, setStreetname] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostcode] = useState("");
  const [testAddress, setTestAddress] = useState("");






  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
      streetNum,
      streetName,
      suburb,
      state,
      postCode,
      testAddress

    };
    console.log(data);

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
console.log(event.target.value)
    setTestAddress(event.target.value);
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

  const handleStreetnumChange = (event) => {
    setStreetnum(event.target.value);
  };

  const handleStreetnameChange = (event) => {
    setStreetname(event.target.value);
  };

  const handleSuburbChange = (event) => {
    setSuburb(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };


  const handleTestAddressChange = (event) => {
    setTestAddress(event.target.value);
  };


  


  return (
    <Container>
      <Form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>

      <Form.Group controlId="formBasicTestAddress">
          <Form.Label>Test Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={testAddress}
            onChange={handleTestAddressChange}
          />
                  <Button variant="primary" value={testAddress} onClick={handleAddressSearch}>
          Submit
        </Button>
        </Form.Group>

        

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleUserChange}
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
          />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStreetnumChange">
          <Form.Label>Street No.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street No."
            value={streetNum}
            onChange={handleStreetnumChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStreetnameChange">
          <Form.Label>Street Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street Name"
            value={streetName}
            onChange={handleStreetnameChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSuburbChange">
          <Form.Label>Suburb</Form.Label>
          <Form.Control
            type="text"
            placeholder="Suburb"
            value={suburb}
            onChange={handleSuburbChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStateChange">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            placeholder="State"
            value={state}
            onChange={handleStateChange}
          >
            <option value="" selected disabled>
              Select State
            </option>
            <option>ACT</option>
            <option>NSW</option>
            <option>NT</option>
            <option>QLD</option>
            <option>SA</option>
            <option>TAS</option>
            <option>VIC</option>
            <option>WA</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicPostcodeChange">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="number"
            placeholder="Postcode"
            value={postCode}
            onChange={handlePostcodeChange}
          />
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
