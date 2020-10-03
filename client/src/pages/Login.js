import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";


import "./style.css";


function Signup(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post('/api/login', data)
      .then((res) => {
        props.setLoggedIn(true);
      })
      .catch(err => {
        console.error(err);
      });
  };


  const handleUserChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <p>
            Or sign up <a href="/signup">here</a>
          </p>

          
    </Form>
  );
}

export default Signup;



