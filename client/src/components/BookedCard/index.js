import React, { useContext, useState } from "react";
import "./style.css";
import { Card, Button, Row, Col } from "react-bootstrap";


function BookedCard(props) {


  return (
<div>
    <Card style={{ borderRadius: "10px", backgroundColor: "#e9ecef" }}>
      <Card.Body>
        <li
          style={{ borderRadius: "10px", marginBottom: "5px" }}
          className="list-group-item"
          key={props.asset_id}
        >
          <Row className="SearchResult row" id={props.asset_id}>
            <Col lg={2} className="assetImage">
              <img className="find-img" src={props.image} alt={props.name} />
            </Col>
            <Col lg={1} className="emptyCol" />
            <Col lg={9} className="assetInfo">
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
            </Col>
          </Row>
          <br></br>

        </li>
      </Card.Body>
    </Card>



</div>



  );
}
 
export default BookedCard;
