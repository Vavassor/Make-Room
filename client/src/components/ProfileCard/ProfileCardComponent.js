import React from "react";

import Help from "../../utilities/Helpers";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";


import "./profileCard.css"



export default function ProfileCard({image, children}){
  return (
    // <Col sm="6" className="pb-3">
      <Card className='portfolio-card'>
        <a href={image.url} rel="noopener noreferrer" target="_blank"><Card.Img variant="top" src={image.url} /></a>
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <Card.Text>{Help.addLineBreaks(image.about)}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">{children? children: ""}</Card.Footer>
      </Card>
    // </Col>
  );
};

export function ProfileInfoCard(props){
  return (
      <Card>
        <Card.Body>
          <Card.Title className="about-me-card-title">{props.portfolioTitle}{props.updateButton && props.updateButton}</Card.Title>
          <Card.Text className="about-me-card-text">{props.children}</Card.Text>
        </Card.Body>
      </Card>
  );

}


// export default ProfileCard;