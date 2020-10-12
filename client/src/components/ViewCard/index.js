import React, { useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function FindCard(props) {
  const { id, email, firstName, lastName } = useContext(UserContext);

  const handleRemove = (event) => {
    event.preventDefault();
    let assetId = event.nativeEvent.target.id;
    console.log("The button was clicked.");
    axios
      .post("/api/deleteAsset", { assetId: assetId, userId: id })
      .then((res) => {
        console.log(res);
        props.update();
      })
      .catch((err) => console.log(err));
  };

  console.log(props);
  return (
    <div>
      <Card style={{ width: "18rem" }} className="box asset-card">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <div className="card-buttons">
            <Button
              id={"edit" + props.id}
              type="button"
              variant="dark"
              onClick={() => props.showModal()}
            >
              Edit
            </Button>
            <Button
              id={"del" + props.id}
              type="button"
              variant="dark"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FindCard;
