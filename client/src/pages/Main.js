import React, {Component} from "react";
import Alert from "react-bootstrap/Alert";
import Api from "../utilities/Api";
import Auth from "../utilities/Auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: "",
      validated: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/profile");
    }
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
      Api
        .logIn(this.state.username, this.state.password)
        .then((response) => {
          Auth.authenticate(response.data.token);
          this.props.handleLogIn();
          this.props.history.push("/profile");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.setState({alert: "Username or password was incorrect."});
          }
          console.error(error);
        });
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

              {this.renderAlert()}

              <Form.Row>
                <Col md="auto">
                  <Button variant="primary" type="submit">
                    Log In
                  </Button>
                </Col>

                <Col md="auto">
                  <a className="btn btn-secondary" href="/create-account" role="button">Create Account</a>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </main>
    );
  }
  
  renderAlert() {
    const message = this.state.alert;
    if (message.length > 0) {
      return (
        <Alert variant="danger">
          {message}
        </Alert>
      );
    } else {
      return "";
    }
  }
}

export default Main;