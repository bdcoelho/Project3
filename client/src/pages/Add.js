import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import axios from "axios";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import View from "./View";

function Add() {
  const { id } = useContext(UserContext);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [itemArray, setItemArray] = useState([]);
  const [complete, setComplete] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [imageURL, setImageURL] = useState("placeholder.png");

  const retrieveCategories = () => {
    axios
      .get("/api/findCategories/")
      .then((categories) => {
        setCategoryArray(categories.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveCategories, []);

  const handleCategoryChange = (event) => {
    event.persist();
    setCategory(event.target.value);
  };

  const handleItemChange = (event) => {
    event.persist();
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    event.persist();
    setDescription(event.target.value);
  };

  const handleDailyPriceChange = (event) => {
    event.persist();
    setDailyPrice(event.target.value);
  };

  const retrieveItems = () => {
    if (category === "") {
      return;
    }
    axios
      .get("/api/findItems/" + category)
      .then((items) => {
        setItemArray(items.data);
        console.log(items.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveItems, [category]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formDataObj = {
      user_id: id,
      category,
      name,
      dailyPrice,
      description,
    };

    const data = new FormData();

    data.append("formData", JSON.stringify(formDataObj));
    data.append("file", imageFile);
    axios
      .post("/api/addAsset", data)
      .then((res) => {
        setComplete(true);
      })
      .catch((err) => console.log(err));
  };

  const fileSelectedHandler = (event) => {
    setImageURL(URL.createObjectURL(event.target.files[0]));
    setImageFile(event.target.files[0]);
  };

  return complete ? (
    <View />
  ) : (
    <Container fluid style={{ paddingLeft: "0" }} className="full-height-container">
      <Row className="full-height">
        <Col md={2} className="pr-0">
          <SideNavBar />
        </Col>
        <Col md={9}>
          <Container className="mt-3">
            <Form
              className="search-form"
              autoComplete="off"
              onSubmit={handleFormSubmit}
            >
              <Form.Row>
                <Col md={3} className="mt-4">
                  <img className="edit-img img-fluid" src={imageURL} alt={name} />
                  <Form.Group controlId="formImage" className="add-img-btn">
                    <Form.File
                      onChange={fileSelectedHandler}
                      className="file-input"
                    ></Form.File>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Row>
                    <Col md={9}>
                      <Form.Group controlId="formCategory">
                        <Form.Label>Categories</Form.Label>
                        <Form.Control
                          as="select"
                          size="md"
                          onChange={handleCategoryChange}
                          defaultValue={"DEFAULT"}
                        >
                          <option disabled value="DEFAULT">
                            Select Category
                          </option>
                          {categoryArray.map((element, index) => (
                            <option key={"cat" + index} value={element}>
                              {element}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="formItem">
                        <Form.Label>Items</Form.Label>
                        <Form.Control
                          as="select"
                          size="md"
                          onChange={handleItemChange}
                          defaultValue={"DEFAULT"}
                        >
                          <option disabled value="DEFAULT">
                            Select Item
                          </option>
                          {itemArray.map((element, index) => (
                            <option key={"item" + index} value={element.item}>
                              {element.item}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col className="d-flex align-items-end pb-3">
                      <Form.Group
                        controlId="formDescription"
                        style={{ width: "100%" }}
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          size="lg"
                          onChange={handleDescriptionChange}
                          className="add-text-area"
                          defaultValue={description}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Group controlId="formPrice">
                    <Form.Row>
                      <Col md={3}>
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
                  <Form.Row>
                    <Col className="d-flex align-items-end pb-3">
                      <Button
                        variant="dark"
                        type="submit"
                        className="add-button"
                      >
                        Add Item
                      </Button>
                    </Col>
                  </Form.Row>
                </Col>
              </Form.Row>
            </Form>
            <br></br>
            <br></br>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Add;
