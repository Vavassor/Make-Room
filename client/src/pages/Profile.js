import React, {Component} from "react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";

//custom components
import ProfileCard from "../components/ProfileCard";

// utils
import Api from "../utilities/Api";
import Auth from "../utilities/Auth";

// css library
import "./pages.css"

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      username: "",
      id: "",
    };
  }

  componentDidMount() {
    Api
      .getSelf()
      .then((response) => {
        const {id, username} = response.data;
        this.setState({
          id: id,
          username: username
        });
      })
      .catch(error => console.error(error));
  }

  handleLogOut(event) {
    Auth.logOut();
    this.props.history.push("/");
  }

  render() {
    return (
      <>
        <Jumbotron className="profile-jumbo fluid mx-0">
          <Row className="justify-content-center text-center">
            <Col sm={6}>
              <h1>My Name!</h1>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-1">
            <Col sm={6}>
              <h5>A little Blurb about me!</h5>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            <Col sm={2}>
              <p>Social Medial Links</p>
            </Col>
            <Col sm={2}>
              <p>Social Medial Links</p>
            </Col>
            <Col sm={2}>
              <p>Social Medial Links</p>
            </Col>
          </Row>
        </Jumbotron>
        <Container className="profile-container">
          <Row className="justify-content-center about-me mb-2">
            <Col xs={10}>
              <Card>
                <Card.Body>
                  <Card.Title>About Me!   Username: {this.state.username} ID: {this.state.id}</Card.Title>
                  <Card.Text> This is some info about me  I am an artist and I this card might even contain an image of me perhaps... </Card.Text>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={this.handleLogOut}
                  >
                    Log Out
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={6}>
                <ProfileCard className="mb-3"/>
                <ProfileCard className="mb-3"/>
                <ProfileCard className="mb-3"/>
                <ProfileCard className="mb-3"/>
                <ProfileCard className="mb-3"/>
                <ProfileCard className="mb-3"/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;