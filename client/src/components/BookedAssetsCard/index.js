import "./style.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import UserContext from "../../utils/UserContext";
import React, { useContext, useState, useEffect } from "react";



function BookedAssetsCard(props) {
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
              <Col lg={2} className="assetImage">
                <img
                  className="find-img"
                  src={props.image}
                  alt={props.assetName}
                />
              </Col>
              <Col lg={1} className="emptyCol" />
              <Col lg={9} className="assetInfo">
                <Row>
                  <h3 className="assetTitle">{props.assetName}</h3>
                </Row>
                <Row>
                  <h6 className="assetSuburb text-muted">
                    <i className="fas fa-map-marker-alt"></i>

                    {" " +
                      props.borrowerStreetNum +
                      " " +
                      props.borrowerStreetName +
                      ", " +
                      props.borrowerSuburb +
                      ", " +
                      props.borrowerState +
                      " " +
                      props.borrowerPostCode}
                  </h6>
                </Row>

                <Row>
                  <Col>
                    <h4>Details</h4>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p>
                      Daily Cost: $ {parseFloat(props.dailyPrice).toFixed(2)}
                    </p>
                  </Col>
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
