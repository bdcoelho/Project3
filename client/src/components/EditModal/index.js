import React from "react";
import "./style.css";

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
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {};
  const handleDescriptionChange = (event) => {};
  const handleHourlyPriceChange = (event) => {};
  const handleDailyPriceChange = (event) => {};

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
                <img className="edit-img" src={props.image} alt={props.name} />
                <Form.Group controlId="formPrice">
                  {console.log(props.hourly)}
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
                          value={props.hourly}
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
                          value={props.daily}
                        ></Form.Control>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Col>

              <Col md={8}>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        as="input"
                        size="md"
                        onChange={handleNameChange}
                        value={props.name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textArea"
                        size="md"
                        onChange={handleDescriptionChange}
                        style={{ minHeight: "200px" }}
                      >
                        {props.description}
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
          <Button type="submit" onClick="">
            Update
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditModal;
