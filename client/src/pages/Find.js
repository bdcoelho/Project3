import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import {
  Col,
  Row,
  Container,
  Button,
  CardDeck,
  Dropdown,
  Form,
} from "react-bootstrap";
import AssetCard from "../components/Card";
import axios from "axios";
let categoryArray = [];

let query = "?lng=144.9544441&lat=-37.8198382";

function View() {
  const [userAssets, setUserAssets] = useState([]);
  const { id, email, firstName, lastName } = useContext(UserContext);

  const [category, setCategory] = useState("");
  const [item, setItem] = useState([]);
  const [distance, setDistance] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);

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

  const findAssets = (event) => {
    event.preventDefault();
    axios
      .get("/api/findUserNear/" + query)
      .then((res) => {
        console.log("executed axios");
        console.log(res);
        setUserAssets(res.data);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(findAssets, []);
  const handleCategoryChange = (event) => {
    event.persist();
    console.log(event);
    console.log("category changed");
  };

  return (
    <Row>
      <Col md={3}>
        <SideNavBar />
      </Col>
      <Col md={9}>
        <Row>
          <Form
            className="search-formj"
            autoComplete="off"
            onSubmit={findAssets}
          >
            <Form.Group controlId="formSearch">
              <Form.Label>Custom select Small</Form.Label>
              <Form.Control
                as="select"
                size="md"
                onChange={handleCategoryChange.bind(this)}
              >
                {categoryArray.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Col>
    </Row>
  );
}

export default View;
