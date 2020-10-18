import React, { useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import BookingModal from "../BookingModal";

function FindCard(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Container>
        <Card style={{ borderRadius: "10px", backgroundColor: "#e9ecef" }}>
          <Card.Body>
            <li
              style={{ borderRadius: "10px", marginBottom: "5px" }}
              className="list-group-item"
              key={props.asset_id}
            >
              <Row className="SearchResult row" id={props.asset_id}>
                <Col lg={3} className="assetImage">
                  <img
                    className="find-img img-fluid"
                    src={props.image}
                    alt={props.name}
                  />
                </Col>

                <Col lg={9} className="asset-info">
                  <Row>
                    <h3 className="assetTitle">{props.name}</h3>
                  </Row>
                  <Row>
                    <h6 className="assetSuburb text-muted">
                      <i className="fas fa-map-marker-alt"></i>
                      {" " +
                        props.dist.toFixed(1) +
                        " km | " +
                        props.suburb +
                        ", " +
                        props.postCode}
                    </h6>
                  </Row>
                  <Row>
                    <p className="assetDescription">{props.description}</p>
                  </Row>

                  <Row className="buttonDiv align-items-end">
                    <Col
                      md={2}
                      style={{
                        textAlign: "left",
                        paddingLeft: "0",
                        paddingRight: "0",
                      }}
                    >
                      Daily Price:
                    </Col>
                    <Col md={2} style={{ paddingLeft: "0" }}>
                      <Row className="border rounded">
                        <Col md={1} className="currency">
                          <div className="shaded-input">$</div>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                          {parseFloat(props.dailyPrice).toFixed(2)}
                        </Col>
                      </Row>
                    </Col>

                    <Col md={8} style={{ textAlign: "right" }}>
                      <Button
                        variant="dark"
                        className="viewAsset btn btn-success"
                        onClick={() => setModalShow(true)}
                      >
                        Book Item
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
            </li>
          </Card.Body>
        </Card>
      </Container>
      <BookingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        asset_id={props.asset_id}
      />
    </div>
  );
}

export default FindCard;
