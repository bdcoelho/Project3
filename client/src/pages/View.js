import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row, Container, Button, CardDeck } from "react-bootstrap";
import ViewCard from "../components/ViewCard";
import axios from "axios";

function View() {
  const [userAssets, setUserAssets] = useState([]);
  const { id, email, firstName, lastName } = useContext(UserContext);
  console.log(id);
  console.log(email);
  console.log(firstName);
console.log(lastName);
  const retrieveAssets = () => {
    axios
      .get("/api/myAssets/" + id)
      .then((res) => {
        console.log("/api/myAssets/" + id);
        console.log(res.data);
        setUserAssets(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(retrieveAssets, []);

  return (
    <Row>
      <Col md={3}>
        <SideNavBar />
      </Col>
      <Col md={9}>
        <Row>
          <CardDeck>
            {userAssets.map((asset) => (
              // console.log(asset)
              <Col md={4} key={asset._id}>
                <ViewCard
                  name={asset.name}
                  image={asset.image}
                  category={asset.category}
                  description={asset.description}
                  hourly={asset.hourlyPrice}
                  daily={asset.dailyPrice}
                />
              </Col>
            ))}
          </CardDeck>
        </Row>
      </Col>
    </Row>

  );
}

export default View;
