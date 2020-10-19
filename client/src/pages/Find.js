import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
} from "react-bootstrap";
import FindCard from "../components/FindCard";
import axios from "axios";

function Find() {
  const [searchResult, setSearchResult] = useState([]);
  const { lng, lat } = useContext(UserContext);

  const [category, setCategory] = useState("");
  const [item, setItem] = useState([]);
  const [distance, setDistance] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [itemArray, setItemArray] = useState([]);

  const retrieveCategories = () => {
    axios
      .get("/api/findCategories/")
      .then((categories) => {
        setCategoryArray(categories.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveCategories, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      category,
      item,
      distance,
      lng,
      lat,
    };

    axios
      .post("/api/findItemsNear/", data)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = (event) => {
    event.persist();
    setCategory(event.target.value);
  };

  const handleItemChange = (event) => {
    event.persist();
    setItem(event.target.value);
  };

  const retrieveItems = () => {
    if (category === "") {
      return;
    }
    axios
      .get("/api/findItems/" + category)
      .then((items) => {
        setItemArray(items.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveItems, [category]);

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const getCategories = () => {
    if (categoryArray.length > 0) {
      return categoryArray.map((element, index) => (
        <option key={"cat" + index} value={element}>
          {element}
        </option>
      ));
    }
  };

  return (
    <Container
      fluid
      style={{ paddingLeft: "0" }}
      className="full-height-container"
    >
      <Row className="full-height">
        <Col md={2} className="pr-0">
          <SideNavBar />
        </Col>
        <Col md={9}>
            <Row className="mt-3">
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
                        {getCategories()}
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

                  <Col>
                    <Form.Group>
                      <Form.Label>Distance (km)</Form.Label>
                      <Form.Control
                        as="input"
                        size="md"
                        onChange={handleDistanceChange}
                        type="number"
                        min="0"
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col className="d-flex align-items-end pb-3">
                    <Button variant="dark" type="submit" className="findButton">
                      Submit
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Row>

            <Row>
              <Col>
                {searchResult.length > 0 ? (
                  searchResult.map((item) => (
                    <FindCard
                      key={item._id}
                      name={item.name}
                      dailyPrice={item.dailyPrice}
                      description={item.description}
                      dist={item.dist / 1000}
                      image={item.image}
                      postCode={item.postCode}
                      suburb={item.suburb}
                      asset_id={item._id}
                      bookings={item.bookings}

                    />
                  ))
                ) : (
                  <h4 style={{ textAlign: "center" }}>
                    No matching items. Enter or change your search criteria.
                  </h4>
                )}
              </Col>
            </Row>

        </Col>
      </Row>
    </Container>
  );
}

export default Find;
