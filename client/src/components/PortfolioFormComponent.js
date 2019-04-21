import React from "react";

// import Jumbotron from "react-bootstrap/Jumbotron";
// import FormControl from "react-bootstrap/FormControl";

// bootstrap components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

  export function ItemForm (props) {

    function saveButton(e){
      props.handleFormSubmit(e);
      props.handleClose();
    };
    
    return (
      <Form>
        <Form.Group controlId="porfolioInfoForm">
        <Row className="my-2">
              <Col xs={12}>
              <Form.Label>Image Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image url"
                  value={props.item.imageUrl}
                  onChange={props.handleInputChange}
                  name="imageUrl"
                />
              </Col>
              <Col xs={12}>
              <Form.Label>Item Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title of this Item"
                  value={props.item.imageTitle}
                  onChange={props.handleInputChange}
                  name="imageTitle"
                />
              </Col>
              </Row>
              
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Info About Porfolio Item: </Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              placeholder="Info about this Item: "
              maxLength="300"
              value={props.item.imageAbout}
              onChange={props.handleInputChange}
              name="imageAbout"
            />
          </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={e => saveButton(e)}
        >
          Save!
        </Button>
      </Form>
    );
  };

  export function PortfolioInfoForm (props) {

    function saveButton(e){
      props.handleFormSubmit(e);
      props.handleClose();
    };
    
    return (
      <Form>
        <Form.Group controlId="porfolioInfoForm">
          <Form.Label>Portfolio Info:</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows="3"
            placeholder="Info about your art"
            value={props.portfolioInfo}
            onChange={props.handleInputChange}
            name="portfolioInfo"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={e => saveButton(e)}
        >
          Save!
        </Button>
      </Form>
    );
  };


