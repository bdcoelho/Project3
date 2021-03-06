import React, { useState } from "react";
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
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [dailyPrice, setDailyPrice] = useState(props.daily);
  const [imageFile, setImageFile] = useState();
  const [imageURL, setImageURL] = useState(props.image);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formDataObj = {
      id: props.assetid,
      name,
      description,
      dailyPrice,
    };

    const data = new FormData();
    // data.append("file", imageFile);

    data.append("formData", JSON.stringify(formDataObj));
    data.append("file", imageFile);

    axios
      .put("/api/modifyAsset/", data)
      .then((res) => {
        props.onHide();
        props.complete();
        // setSearchResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fileSelectedHandler = (event) => {
    setImageURL(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handleDailyPriceChange = (event) => {
    setDailyPrice(event.target.value);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{opacity:"unset"}}
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
                <img className="edit-img img-fluid" src={imageURL} alt={name} />
                <Form.Group controlId="formImage">
                  <Form.Control
                    as="input"
                    type="file"
                    onChange={fileSelectedHandler}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Row>
                    <Col>
                      <Form.Label>Daily Price</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            $
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="input"
                          type="number"
                          min="0"
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
                        disabled
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
                        style={{ minHeight: "250px" }}
                        defaultValue={description}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Update
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditModal;
