import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import React, {Component} from "react";
import Auth from "../utilities/Auth";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(event) {
    Auth.logOut();
    this.props.history.push("/");
  }

  render() {
    return (
      <main>
        <Jumbotron>
          <h1>This is the profile!</h1>
        </Jumbotron>

        <Card>
          <Card.Body>
            <Button
              variant="primary"
              type="button"
              onClick={this.handleLogOut}
            >
              Log Out
            </Button>
          </Card.Body>
        </Card>
      </main>
    );
  }
}

export default Profile;