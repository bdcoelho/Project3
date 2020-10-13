import React, { useContext, useState } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import axios from "axios";

import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

function EditModal(props) {
  const { id, email, firstName, lastName, lng, lat } = useContext(UserContext);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [hourlyPrice, setHourlyPrice] = useState(props.hourly);
  const [dailyPrice, setDailyPrice] = useState(props.daily);
  console.log(props.assetid);

  const handleFormSubmit = (event) => {

    event.preventDefault();
    const data = {
      id:props.assetid,
      name,
      description,
      hourlyPrice,
      dailyPrice,
    };
    console.log(data);

    axios
      .post("/api/modifyAsset/", data)
      .then((res) => {
        console.log(res);
        props.onHide();
        props.onComplete();
        // setSearchResult(res.data);
      })
      .catch((err) => console.log(err));
  };






  const handleNameChange = (event) => {
    setName(event.target.value)
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };
  const handleHourlyPriceChange = (event) => {
    setHourlyPrice(event.target.value)
  };
  const handleDailyPriceChange = (event) => {
    setDailyPrice(event.target.value)
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title>
      </Modal.Header>
      <Form
        className="edit-form"
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <Modal.Body>
          <Container>
            <Row>
              <Col md={4}>
                <img className="edit-img" src={props.image} alt={name} />
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Row>
                    <Col>
                      <Form.Label>Hourly</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            $
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="input"
                          type="number"
                          size="md"
                          onChange={handleHourlyPriceChange}
                          value={hourlyPrice}
                        ></Form.Control>
                      </InputGroup>
                    </Col>
                    <Col>
                      <Form.Label>Daily</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            $
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="input"
                          type="number"
                          size="md"
                          onChange={handleDailyPriceChange}
                          value={dailyPrice}
                        ></Form.Control>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Row>
                  <Col md={12}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        as="input"
                        size="md"
                        onChange={handleNameChange}
                        value={name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        size="md"
                        onChange={handleDescriptionChange}
                        style={{ minHeight: "200px" }}
                        defaultValue={description}
                      >
                        
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          {/* <h4>{props.name}</h4>
          <p>
    {props.description}}
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Update
          </Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditModal;
