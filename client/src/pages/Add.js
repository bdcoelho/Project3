import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import axios from "axios";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";

function Add() {
  const { id, email, firstName, lastName, lng, lat } = useContext(UserContext);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [itemArray, setItemArray] = useState([]);

  const retrieveCategories = () => {
    axios
      .get("/api/findCategories/")
      .then((categories) => {
        console.log(categories.data);
        setCategoryArray(categories.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveCategories, []);

  const handleCategoryChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleItemChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setDescription(event.target.value);
  };

  const handleDailyPriceChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setDailyPrice(event.target.value);
  };

  const handleHourlyPriceChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setHourlyPrice(event.target.value);
  };

  const retrieveItems = () => {
    if (category === "") {
      return;
    }
    axios
      .get("/api/findItems/" + category)
      .then((items) => {
        console.log(items.data);
        setItemArray(items.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveItems, [category]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      user_id:id,
      category,
      name,
      hourlyPrice,
      dailyPrice,
      description,
    };
    console.log(data);

    axios
      .post("/api/addAsset", data)
      .then((res) => {
        console.log(res);

      })
      .catch((err) => console.log(err));






  };
  return (
    <Row>
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
              <Col>
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
                      // console.log(element)
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
              <Form.Label>Price</Form.Label>
              <Form.Row>
                <Col md={3}>
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
                <Col md={3}>
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
            <Form.Row>
              <Col className="d-flex align-items-end pb-3">
                <Button variant="dark" type="submit" className="add-button">
                  Add Item
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <br></br>
          <br></br>
        </Container>
      </Col>
    </Row>
  );
}

export default Add;
