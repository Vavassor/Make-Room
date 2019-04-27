import React, {Component} from "react";

// bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

export class ItemForm extends Component {
  constructor(props) {
    super(props);

    this.imageFile = React.createRef();

    this.saveButton = this.saveButton.bind(this);
  }

  saveButton(e) {
    e.preventDefault();
    this.props.handleFormSubmit(e, this.imageFile.current.files[0], this.props.handleClose);
  }
  
  render() {
    const props = this.props;
    
    return (
      <Form>
        <Form.Group controlId="portfolio-item-image-file">
          <Form.Label>Image File</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="imageFile"
            ref={this.imageFile}
          />
        </Form.Group>

        <Form.Group controlId="portfolio-item-image-url">
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://example.com/image.jpg"
            value={props.item.imageUrl}
            onChange={props.handleInputChange}
            name="imageUrl"
          />
        </Form.Group>

        <Form.Group controlId="portfolio-item-title">
          <Form.Label>Item Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of this Item"
            value={props.item.imageTitle}
            onChange={props.handleInputChange}
            name="imageTitle"
          />
        </Form.Group>

        <Form.Group controlId="portfolio-item-info">
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

        <ProgressBar className="mb-3" now={Math.round(100 * props.item.uploadProgress)} />

        <Form.Row>
          <Col>
            <Button
              variant="primary"
              type="submit"
              onClick={this.saveButton}
            >
              Save
            </Button>
            
            <Button
              variant="secondary"
              onClick={props.handleClose}
              className="ml-2"
            >
              Close
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

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


