import React, {Component} from "react";
import Alert from "react-bootstrap/Alert";
import Api from "../utilities/Api";
import Auth from "../utilities/Auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
// import {Link} from "react-router-dom";

import CreateAccount from "../components/CreateAccountComponent"

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: "",
      validated: false,
      creatingAccount: false,
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

  toggleCreateAccount = () => {
    let toggle = this.state.creatingAccount === false;
    this.setState({creatingAccount: toggle});
  }

  renderCreateAccount(){
    return <CreateAccount toggle={this.toggleCreateAccount}/>
  }

  renderLogin(){
    return (
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

            <Row className='justify-content-around'>
              <Col md="auto" className='text-center'>
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              </Col>

              <Col md={"auto"} className='text-center'>
                <Button
                  // className="btn btn-secondary"
                  // to="/create-account"
                  // role="button"
                  onClick={this.toggleCreateAccount}
                  className="mt-md-0 mt-2"
                >
                  Create Account
                </Button>
              </Col>
            </ Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  render() {

    return (
      <main>
        <Jumbotron>
          <Row className="justify-content-center text-center">
            <Col className="jumbo-header" sm={6}>
              <h1>Make Room!</h1>
              <p>
                An event planner and portfolio platform for local RVA artists and craftspeople.
              </p>
            </Col>
          </Row>
        </Jumbotron>
        <div className="container-fluid">
          <Row className="justify-content-center">
            <Col sm={12} md={6} lg={6}>
              {this.state.creatingAccount? this.renderCreateAccount() : this.renderLogin()}
            </Col>
          </Row>
        </div>
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