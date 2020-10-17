import React, { useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Card, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import EditModal from "../EditModal";

function FindCard(props) {
  const { id, email, firstName, lastName } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);

  const handleRemove = (event) => {
    event.preventDefault();
    let assetId = event.nativeEvent.target.id;
    axios
      .post("/api/deleteAsset", { assetId: assetId, userId: id })
      .then((res) => {
        props.update();
      })
      .catch((err) => console.log(err));
  };
  console.log(props);
  return (
    <div>
      <Card style={{ borderRadius: "10px", backgroundColor: "#e9ecef" }}>
        <Card.Body>
          <li
            style={{ borderRadius: "10px", marginBottom: "5px" }}
            className="list-group-item"
          >
            <Row className="SearchResult row" id={props.id}>
              <Col lg={3} className="assetImage">
                <img
                  className="find-img img-fluid"
                  src={props.image}
                  alt={props.Name}
                />
              </Col>

              <Col lg={9} className="asset-info">
                <Row>
                  <Col>
                    <h3 className="assetTitle">{props.name}</h3>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h4>Description</h4>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p>{props.description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col>
                  <div className="shaded-input">
                    $
                  </div>
                  </Col>
                  <Col>
                  {props.daily}
                  </Col>
                  </Row>

                  </Col>
                  <Col md={8} className="view-buttons">
                    <div className="card-buttons">
                      <Button
                        id={props.id}
                        type="button"
                        variant="dark"
                        onClick={() => setModalShow(true)}
                      >
                        Edit
                      </Button>
                      <Button
                        id={props.id}
                        type="button"
                        variant="dark"
                        onClick={handleRemove}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br></br>
          </li>
        </Card.Body>
      </Card>
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        complete={props.update}
        name={props.name}
        image={props.image}
        category={props.category}
        description={props.description}
        hourly={props.hourly}
        daily={props.daily}
        assetid={props.id}
      />
    </div>
  );
}

export default FindCard;
