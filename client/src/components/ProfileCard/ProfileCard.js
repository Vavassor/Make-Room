import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


import "./profileCard.css"




function ProfileCard({image}){
  return (
    <Col sm="4">
      <Card>
        <Card.Img variant="top" src={image.url} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <Card.Text>{image.about}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

}


export default ProfileCard;