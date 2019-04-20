import React, {Component} from "react";

// bootstrap components
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

//custom components
import ProfileCard from "../components/ProfileCard";



// utils
import Api from "../utilities/Api";

// css library
import "./pages.css"


class ProfileView extends Component {
  constructor(props) {
    super(props);


    this.state = {
      username: "",
      id: "",
      portfolio: "",
      portfolioInfo: "",
      firstname:  "",
      lastname: "",
      email: "",
      blurb: "",
      website:"",
    };
  }


  componentDidMount() {
    this.getUserAndPorfolio(this.props.match.params.id)
  };

  getUserAndPorfolio = (id) => {
    this.getProfilePortfolio(id)
    this.getUserInfo(id);
  };

  getUserInfo= (id) => {
    Api
      .getUserInfoById(id)
      .then(response => {
        this.setState({...response.data[0]})
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
                {this.state.firstname
                  ? this.state.firstname + " " + this.state.lastname
                  : "Anon"}
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-1">
            <Col sm={6}>
              <h5>{this.state.blurb}</h5>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            {this.state.email ?  <Col className="web-link" sm={2}><a href={this.state.email} target="_blank" rel="noopener noreferrer">Email:</a></Col>: ""}
            {this.state.website ? <Col className="web-link" sm={2}><a href={this.state.website} target="_blank" rel="noopener noreferrer">Website:</a></Col>: ""}
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
                      : "Oops, they haven't added any info about my porfolio"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={10}>
              <Row className="justify-content-between">
                {this.state.portfolio.length ? (
                  this.state.portfolio.map(imageInfo => (
                    <ProfileCard key={imageInfo.url} image={imageInfo} />
                  ))
                ) : (
                  <h3>They don't have any items in their porfolio</h3>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default ProfileView;


