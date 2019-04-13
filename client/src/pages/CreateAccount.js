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

    this.confirmPassword = React.createRef();
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
    let passedValidation = form.checkValidity();

    this.setState({
      validated: true,
    });

    if (this.state.password !== this.state.confirmPassword) {
      this.confirmPassword.current.setCustomValidity("Passwords don't match.");
      passedValidation = false;
    } else {
      this.confirmPassword.current.setCustomValidity("");
    }

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
                <Form.Control.Feedback type="invalid">
                  Please enter a username.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleInputChange}
                  ref={this.confirmPassword}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the same password again.
                </Form.Control.Feedback>
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