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
import Plax from "../components/ParallaxComponent";
import Help from "../utilities/Helpers";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: "",
      validated: false,
      creatingAccount: false,
      image: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/profile");
    }
    const newImage=Help.randomImage();
    this.setState({image: newImage})
  }

  componentDidUpdate() {
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
        .logIn(this.state.username.trim(), this.state.password.trim())
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
    return <CreateAccount toggle={this.toggleCreateAccount} handleLogIn={this.props.handleLogIn} />
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

            <Row className='justify-content-around m-0'>
              <Col md="auto" className='text-center'>
                <Button variant="primary" type="submit" className='mt-2'>
                  Log In
                </Button>
              </Col>

              <Col md={"auto"} className='text-center'>
                <Button
                  onClick={this.toggleCreateAccount}
                  className="mt-2"
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
        <Jumbotron className='mb-0'>
          <Row className="justify-content-center text-center">
            <Col className="jumbo-header" sm={6}>
              <h1>Make Room!</h1>
              <p>
                An event planner and portfolio platform for local RVA artists and craftspeople.
              </p>
            </Col>
          </Row>
        </Jumbotron>
        <Plax height="90vh" width="30%" image={this.state.image}>
              {this.state.creatingAccount? this.renderCreateAccount() : this.renderLogin()}
          </Plax>
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