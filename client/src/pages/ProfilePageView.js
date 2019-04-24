import React, {Component} from "react";
import { Link } from "react-router-dom";

// bootstrap components
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";


//custom components
import ProfileCard, { ProfileInfoCard } from "../components/ProfileCard";
import MasonryLayout from "../components/MasonryLayout"

// utils
import Api from "../utilities/Api";
import Help from "../utilities/Helpers";



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
      events:"",
      columnCount: 3,

    };
  }


  componentDidMount() {
    this.getUserAndPorfolio(this.props.match.params.id)
    this.getUserEvents(this.props.match.params.id)
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
      console.log(data)
      this.setState({
        portfolio: data.data[0].images,
        portfolioInfo:data.data[0].portfolioDetails
      })
    })
    .catch(error => console.error(error));
  };

  getUserEvents = (userId) => {
    Api
      .getUserEvents(userId)
      .then(response => { 
        let events = response.data.map(event => {
          return {
            name: event.name,
            id: event._id
          }})
        this.setState({events: events});
      })
      .catch(error => { console.error(error)  });
  };

  render() {

    let cEvents = [...this.state.events]

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
            {this.state.email ? (
              <Col className="web-link" sm={2}>
                <a
                  href={this.state.email}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.email}
                </a>
              </Col>
            ) : (
              ""
            )}
            {this.state.website ? (
              <Col className="web-link" sm={2}>
                <a
                  href={this.state.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Jumbotron>
        <Container className="profile-container">
          <Row className="justify-content-center about-me mb-2">
          <Col xs={6} className='text-center'>
          <Dropdown>
                <Dropdown.Toggle className='mb-2' variant="success" id="events-attending-dropdown">
                  Events Attending
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {cEvents.length ? (
                    cEvents.map(event => this.renderEventList(event))
                  ) : (
                    <Dropdown.Item>Not Attending Events</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
          </Col>
            <Col xs={12}>
            <ProfileInfoCard portfolioTitle={"About My Work"}>
              {
                this.state.portfolioInfo ? (
                  Help.addLineBreaks(this.state.portfolioInfo)
                ) : (
                    "Oops, I haven't added any info about my porfolio"
                )
              }
              </ProfileInfoCard>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={12}>
              {this.state.portfolio.length ? (
                <MasonryLayout columns={3} gap={25}>
                {
                  Help.sortByDate([...this.state.portfolio]).map(imageInfo => (
                  <ProfileCard key={imageInfo._id} image={imageInfo} />) )
                   } 
                </MasonryLayout>
              ) : (
                <h3>They don't have any items in their porfolio</h3>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  renderEventList =(event) => {
    return <Link className='dropdown-item' to={"/event/" + event.id} key={event.id}><p className="user-event-li">{event.name}</p></Link>
  }

};

export default ProfileView;


