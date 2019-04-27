import React, {Component} from "react";
import Api from "../utilities/Api";
import Auth from "../utilities/Auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: "",
      password: "",
      username: "",
      validated: false,
      errors: {
        username: "Please enter a username.",
        password: "Please enter a password.",
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.passwordInput = React.createRef();
    this.usernameInput = React.createRef();
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

    this.confirmPassword.current.setCustomValidity("");
    this.passwordInput.current.setCustomValidity("");
    this.usernameInput.current.setCustomValidity("");

    let passedValidation = form.checkValidity();

    this.setState({
      validated: true,
      errors: {
        username: "Please enter a username.",
        password: "Please enter a password.",
      },
    });

    if (this.state.password !== this.state.confirmPassword) {
      this.confirmPassword.current.setCustomValidity("Passwords don't match.");
      passedValidation = false;
    }

    if (passedValidation) {
      Api
        .createAccount(this.state.username, this.state.password)
        .then(user => Api.logIn(this.state.username, this.state.password))
        .then((response) => {
          Auth.authenticate(response.data.token);
          this.props.handleLogIn();
          this.props.toggle();
        })
        .catch((error) => {
          const errorObject = error.response.data;
          if (errorObject.kind === "validation") {
            for (const failure of errorObject.errors) {
              this.setState((state, props) => {
                return {
                  errors: {
                    ...state.errors,
                    [failure.target]: failure.message,
                  },
                };
              });

              switch (failure.target) {
                case "username":
                  this.usernameInput.current.setCustomValidity(failure.message);
                  break;
  
                case "password":
                  this.passwordInput.current.setCustomValidity(failure.message);
                  break;
                default: return
              }
            }
          }
        });
    }
  }
  
  render() {
    return (
        <Card>
          <Card.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="username">
                <Form.Label>New Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={this.handleInputChange}
                  ref={this.usernameInput}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  ref={this.passwordInput}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.password}
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
              <div className="row justify-content-around">
                <div className="col text-center">
                  <Button variant="primary" type="submit">
                    Create Account
                  </Button>
                </div>
                <div className="col text-center">
                  <Button
                    variant="success"
                    type="button"
                    onClick={this.props.toggle}
                  >
                    Return to Login
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
    );
  }
}

export default CreateAccount;