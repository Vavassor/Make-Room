import React from "react";

import Help from "../../utilities/Helpers";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";


import "./profileCard.css"



function ProfileCard({image, children}){
  return (
    // <Col sm="6" className="pb-3">
      <Card>
        <Card.Img variant="top" src={image.url} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <div>{Help.addLineBreaks(image.about)}</div>
        </Card.Body>
        <Card.Footer className="text-center">{children? children: ""}</Card.Footer>
      </Card>
    // </Col>
  );

}


export default ProfileCard;