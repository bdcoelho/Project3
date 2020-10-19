import React, { useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import EditModal from "../EditModal";

function FindCard(props) {
  const [modalShow, setModalShow] = useState(false);

  const handleRemove = (event) => {
    event.preventDefault();
    let assetId = event.nativeEvent.target.id;
    axios
      .delete("/api/deleteAsset/"+assetId)
      .then(() => {
        props.update();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Container>
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
                <Row className="align-items-end">
                  <Col md={2} style={{ paddingRight: "0"}}>
                    Daily Price:
                  </Col>

                  <Col md={2} style={{ paddingLeft: "0"}}>
                    <Row className="border rounded">
                      <Col md={1} className="currency">
                        <div className="shaded-input">$</div>
                      </Col>
                      <Col style={{textAlign:"center"}}>{parseFloat(props.daily).toFixed(2)}</Col>
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
                        variant="danger"
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
      </Container>
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
