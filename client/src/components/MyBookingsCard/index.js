import "./style.css";
import { Card, Button, Row, Col, Table } from "react-bootstrap";
import UserContext from "../../utils/UserContext";
import React, { useContext, useState, useEffect } from "react";

function MyBookingsCard(props) {
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
                  alt={props.assetName}
                />
              </Col>

              <Col lg={9} className="asset-info">
                <Row>
                  <Col>
                    <h3 className="assetTitle">{props.assetName}</h3>
                  </Col>
                </Row>
                <Row>
                <Col>

                  <h6 className="assetSuburb text-muted">
                    <i className="fas fa-map-marker-alt"></i>

                    {" " +
                      props.streetNum +
                      " " +
                      props.streetName +
                      ", " +
                      props.suburb +
                      ", " +
                      props.state +
                      " " +
                      props.postCode}
                  </h6>
                  </Col>

                </Row>

                <Row>
                  <Col>
                    <h4>Details</h4>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Table bordered hover responsive size="sm">
                      <tbody>
                      <tr>
                          <td>Neighbour</td>
                          <td>
                            {props.firstName + " " + props.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td>Contact</td>
                          <td>
                            {props.email}
                          </td>
                        </tr>
                        <tr>
                          <td>Period</td>
                          <td>
                            {props.startDate} - {props.endDate}   ({props.numberDays} {(props.numberDays>1)?"days":"day"})
                          </td>
                        </tr>
                        <tr>
                          <td>Daily Cost</td>
                          <td>$ {parseFloat(props.dailyPrice).toFixed(2)}</td>
                        </tr>

                        <tr>
                          <td>Total Cost</td>
                          <td>$ {parseFloat(props.totalPrice).toFixed(2)}</td>
                        </tr>


                      </tbody>
                    </Table>

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

export default MyBookingsCard;
