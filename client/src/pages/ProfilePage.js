import React, {Component} from "react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

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
      portfolio: "",
      portfolioInfo: "",
      userInfo: "",
    };
  }

  componentDidMount() {
    Api
    .getSelf()
    .then((response) => {
      const {id, username} = response.data;
      this.getProfilePortfolio(id)
      this.getUserInfo(id);
      this.setState({
        id: id,
        username: username
      });
    })
    .catch(error => console.error(error));
  }

  getUserInfo(id){
    console.log(typeof id)
    console.log(id.length);
    Api
      .getUserInfoById(id)
      .then(response => {
        this.setState({userInfo: response.data[0]})
      })
      .catch(err => console.error("get user error: ", err))
  };

  getProfilePortfolio = (id) => {
    Api
    .getProfilePortfolioById(id)
    .then(data => {
      this.setState({
        portfolio: data.data[0].images,
        portfolioInfo:data.data[0].portfolioDetails

      })
    })
    .catch(error => console.error(error));

  }

  handleLogOut(event) {
    Auth.logOut();
    this.props.history.push("/");
  }

  mediaLinks(link){
    let x = Object.entries(link);
    return x.map(item => <Col key={item[1]} sm={2}><a href={item[1]} target="_blank" rel="noopener noreferrer">{item[0]}</a></Col>)
  }

  render() {
    return (
      <>
        <Jumbotron className="profile-jumbo fluid mx-0">
          <Row className="justify-content-center text-center">
            <Col sm={6}>
              <h1>
                {this.state.userInfo.firstname
                  ? this.state.userInfo.firstname +
                    ", " +
                    this.state.userInfo.lastname
                  : "Anon"}
              </h1>
              <Button
                variant="primary"
                type="button"
                onClick={this.handleLogOut}
              >
                Log Out
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-1">
            <Col sm={6}>
              <h5>{this.state.userInfo.blurb}</h5>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            {this.state.userInfo.socialMediaHandles ? this.mediaLinks(this.state.userInfo.socialMediaHandles) : ""}
          </Row>
        </Jumbotron>
        <Container className="profile-container">
          <Row className="justify-content-center about-me mb-2">
            <Col xs={10}>
              <Card>
                <Card.Body>
                  <Card.Title>About My Work</Card.Title>
                  <Card.Text>
                    {this.state.portfolioInfo
                      ? this.state.portfolioInfo
                      : "Oops, I haven't added any info about my porfolio"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={11}>
              <Row className="justify-content-center">
                {this.state.portfolio.length ? (
                  this.state.portfolio.map(imageInfo => (
                    <ProfileCard key={imageInfo.url} image={imageInfo} />
                  ))
                ) : (
                  <h3>I don't have any items in my porfolio</h3>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;