import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, {Component} from "react";
import Row from "react-bootstrap/Row";

const defaultErrors = {
  address: "Please enter a street address.",
  locationName: "Please enter a location name.",
  name: "Please enter a name.",
};

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      address: "",
      name: "",
      errors: defaultErrors,
      validated: false,
    };

    this.form = React.createRef();
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const passedValidation = this.form.current.checkValidity();
    this.setState({validated: true});

    if (passedValidation) {
      console.error("Submission not implemented yet!");
    }
  }

  render() {
    return (
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <Form
            noValidate
            onSubmit={this.handleSubmit}
            ref={this.form}
            validated={this.state.validated}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                name="locationName"
                value={this.state.locationName}
                onChange={this.handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.locationName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Add Event</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default AddEvent;