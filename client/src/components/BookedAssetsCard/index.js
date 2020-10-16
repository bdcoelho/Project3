import "./style.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import UserContext from "../../utils/UserContext";
import React, { useContext, useState, useEffect } from "react";

const temp = "zzzzz";

function BookedAssetsCard(props) {
  return (
    <div>
      <Card style={{ borderRadius: "10px", backgroundColor: "#e9ecef" }}>
        <Card.Body>
          <li
            style={{ borderRadius: "10px", marginBottom: "5px" }}
            className="list-group-item"
            key={temp}
          >
            <Row className="SearchResult row" id={temp}>
              <Col lg={2} className="assetImage">
                <img className="find-img" src={temp} alt={temp} />
              </Col>
              <Col lg={1} className="emptyCol" />
              <Col lg={9} className="assetInfo">
                <Row>
                  <h3 className="assetTitle">{temp}</h3>
                </Row>
                <Row>
                  <h6 className="assetSuburb text-muted">
                    <i className="fas fa-map-marker-alt"></i>
                    {temp}
                  </h6>
                </Row>
                <Row>
                  <p className="assetDescription">{temp}</p>
                </Row>
              </Col>
            </Row>
            <br></br>
          </li>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookedAssetsCard;
