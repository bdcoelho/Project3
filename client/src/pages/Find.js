import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row, Container, Button, CardDeck, Dropdown, Form } from "react-bootstrap";
import AssetCard from "../components/Card";
import axios from "axios";
let categoryArray=[]

let query = "?lng=144.9544441&lat=-37.8198382"

function View() {
  const [userAssets, setUserAssets] = useState([]);
  const { id, email, firstName, lastName } = useContext(UserContext);

  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [distance, setdistance] = useState([]);


  const retrieveCategories = () => {
    axios
    .get("/api/findCategories/").then((categories)=>{
   console.log(categories.data);
   categoryArray=categories.data
// items.forEach(item => {console.log(item.Category)
  
}).catch((err) => console.log(err));


  }

retrieveCategories();

  const findAssets = (event) => {
    event.preventDefault();
    axios
      .get("/api/findUserNear/" + query)
      .then((res) => {
        console.log("executed axios")
        console.log(res);
        setUserAssets(res.data);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(findAssets, []);

  return (
    <Row>
      <Col md={3}>
        <SideNavBar />
      </Col>
      <Col md={9}>
        <Row>





        <Form className="search-formj" autoComplete="off" onSubmit={findAssets}>
        <Form.Group controlId="formSearch">

        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Categories
  </Dropdown.Toggle>

  <Dropdown.Menu>

    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>



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
