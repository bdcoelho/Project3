import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row, Container, Button, CardDeck } from "react-bootstrap";
import ViewCard from "../components/ViewCard";
import axios from "axios";

function View() {
  const [userAssets, setUserAssets] = useState([]);
  const { id, email, firstName, lastName } = useContext(UserContext);
  const retrieveAssets = () => {
    console.log(id);
    if (id) {
      axios
        .get("/api/myAssets/" + id)
        .then((res) => {
          setUserAssets(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(retrieveAssets, [id]);

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
          <Row>
            <Col>
            <h1 style={{textAlign:"center", margin:"20px 0px 20px 0px"}}>Your Items</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {userAssets.length > 0
                ? userAssets.map((asset) => (
                    <Col md={12} key={asset._id}>
                      <ViewCard
                        name={asset.name}
                        image={asset.image}
                        category={asset.category}
                        description={asset.description}
                        hourly={asset.hourlyPrice}
                        daily={asset.dailyPrice}
                        id={asset._id}
                        update={retrieveAssets}
                      />
                    </Col>
                  ))
                : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default View;
