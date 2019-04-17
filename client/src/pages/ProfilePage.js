import React, {Component} from "react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

//custom components
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import ProfileFormModal from "../components/ProfileFormModal";



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
      firstname:  "",
      lastname: "",
      email: "",
      blurb: "",
      website:"",
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

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value)
    this.setState({[name]: value});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let userInfo = {...this.state}
    delete userInfo.id
    delete userInfo.username
    console.log("Submitting: ", userInfo);
    userInfo = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      blurb: userInfo.blurb,
      website: userInfo.website,
      email: userInfo.email
    }
    console.log("Mutated Info: ", userInfo)
    const {id} = this.state

    Api
    .updateUserProfile(id, userInfo)
    .then(result => console.log(result))
    .catch(err => console.error(err))
  };

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
                {this.state.firstname
                  ? this.state.firstname + " " + this.state.lastname
                  : "Anon"}
              </h1>
              <UpdateModal handleInputChange={this.handleInputChange} handleFormSubmit = {this.handleFormSubmit} userInfo={this.state}/>
              <Button
                variant="warning"
                type="button"
                onClick={this.handleLogOut}
              >
                Log Out
              </Button>
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
                      : "Oops, I haven't added any info about my porfolio"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={10}>
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


class UpdateModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Update Profile
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body><ProfileFormModal {...this.props}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
