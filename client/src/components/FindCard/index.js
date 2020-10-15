import React, { useContext, useState } from "react";
import "./style.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import BookingModal from "../BookingModal";



function FindCard(props) {
  const [modalShow, setModalShow] = useState(false);


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
          <Row className="buttonDiv ">
            <Button
              className="saveAsset btn btn-primary"
              id={props.asset_id}
            >
              Save Asset
            </Button>
              <Button className="viewAsset btn btn-success" onClick={() => setModalShow(true)}>View Asset</Button>

          </Row>
        </li>
      </Card.Body>
    </Card>


<BookingModal

show={modalShow}
onHide={() => setModalShow(false)}
asset_id={props.asset_id}

/>

</div>



  );
}
 
export default FindCard;
