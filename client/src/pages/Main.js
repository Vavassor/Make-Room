import React, {Component} from "react";
import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

class PageNotFound extends Component {
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
    const form = event.currentTarget;
    const passedValidation = form.checkValidity();

    this.setState({
      validated: true,
    });

    if (!passedValidation) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <main>
        <Jumbotron>
          <h1>Howdy!</h1>
        </Jumbotron>

        <Card>
          <Card.Body>
            <Form
              noValidate
              action="/api/login"
              method="POST"
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

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </main>
    );
  }
}

export default PageNotFound;