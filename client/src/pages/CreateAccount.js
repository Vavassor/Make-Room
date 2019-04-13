import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const passedValidation = form.checkValidity();

    this.setState({
      validated: true,
    });

    if (passedValidation) {
      console.error("Submit not implemented yet!");
    }
  }
  
  render() {
    return (
      <main>
        <Card>
          <Card.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password1"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password2">
                <Form.Label>Enter Password Again</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </main>
    );
  }
}

export default CreateAccount;