import React, {Component} from "react";

// bootstrap components
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import UpdateModal from "../components/UpdateModal";

//custom components
import ProfileCard from "../components/ProfileCard";
import { ItemButton } from "../components/ButtonComponent"



// utils
import Api from "../utilities/Api";

// css library
import "./pages.css"


class Profile extends Component {
  constructor(props) {
    super(props);

    // this.handleLogOut = this.handleLogOut.bind(this);

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
      imageUrl: "",
      imageTitle: "",
      imageAbout: "",
      imageId: "",
      imageOrder: ""
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
    // console.log(name,": ",  value)
    this.setState({[name]: value});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let userInfo = {...this.state}
    delete userInfo.id
    delete userInfo.username
    userInfo = {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      blurb: userInfo.blurb,
      website: userInfo.website,
      email: userInfo.email
    }
    const {id} = this.state

    Api
    .updateUserProfile(id, userInfo)
    // .then(result => console.log(result))
    .catch(err => console.error(err))
  };

  handlePortfolioInfoSubmit = event => {
    event.preventDefault();
    let {id, portfolioInfo} = this.state;
    Api
    .updatePorfolioInfo(id, {portfolioInfo:portfolioInfo})
    // .then(data => console.log(data))
    .catch(err => console.log(err))
  };

  handlePortfolioImageSubmit = event => {
    event.preventDefault();
    let {imageId, imageUrl, imageTitle, imageAbout, imageOrder} = this.state
    let portfolioItem = {
      url: imageUrl,
      title: imageTitle,
      about: imageAbout,
      order: imageOrder
    };
    
    // Api
    // .updatePorfolioItem(userId, portfolioItem)
    // .then(data => console.log(data))
    // .catch(err => console.log(err))
  };

  createNewPortfolioItem = (event) => {
    event.preventDefault();
    Api
    .addPortfolioItem(this.state.id)
    .then(data => {
      // console.log(data)
      this.getProfilePortfolio(this.state.id);
    })
    .catch(err => console.error(err))
  };

  deletePortfolioItem = (itemId) => {
    Api
    .deletePortfolioItem(this.state.id, itemId)
    .then(data => {
      // console.log(data)
      this.getProfilePortfolio(this.state.id);
    })
    .catch(err => console.error(err))
  }

  mediaLinks(link){
    let x = Object.entries(link);
    return x.map(item => <Col key={item[1]} sm={2}><a href={item[1]} target="_blank" rel="noopener noreferrer">{item[0]}</a></Col>)
  }

  portfolioSort = (items) => {
    return items.sort((a, b) => new Date(b.order) - new Date(a.order))
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
              <UpdateModal
                form={"profile"}
                task={"Update Profile"}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                userInfo={this.state}
              />
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-1">
            <Col sm={6}>
              <h5>{this.state.blurb}</h5>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            {/* <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Send Mail</a> */}
            {this.state.email ? (
              <Col className="web-link" sm={2}>
                <a
                  href={`mailto:${this.state.email}?Subject=Hi%20There`}
                  target="_top"
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
            <Col xs={10}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    About My Work
                    <ItemButton
                      action={this.createNewPortfolioItem}
                      size="sm"
                      variant="success"
                    >
                      <i className="far fa-plus-square" />
                    </ItemButton>
                  </Card.Title>
                  <Card.Text>
                    {this.state.portfolioInfo
                      ? this.state.portfolioInfo
                      : "Oops, I haven't added any info about my porfolio"}
                    <UpdateModal
                      task="Update Portfolio Info"
                      form={"portfolioInfo"}
                      handleInputChange={this.handleInputChange}
                      handleFormSubmit={this.handlePortfolioInfoSubmit}
                      portfolioInfo={this.state.portfolioInfo}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={10}>
              {/* <Row className="justify-content-between"> */}
              {this.state.portfolio.length ? (
                <CardColumns>
                  {
                    this.portfolioSort([...this.state.portfolio]).map(
                      imageInfo => (
                        <ProfileCard
                          key={imageInfo._id}
                          image={imageInfo}
                          imgId={imageInfo._id}
                        >
                          <UpdateModal
                            form={"itemInfo"}
                            task={"Update Item"}
                            variant="success"
                            icon={"Update"}
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleItemSubmit}
                            userInfo={this.state}
                          />

                          <ItemButton
                            size="sm"
                            variant={"danger"}
                            action={() =>
                              this.deletePortfolioItem(imageInfo._id)
                            }
                          >
                            <i className="far fa-trash-alt" />
                          </ItemButton>
                        </ProfileCard>
                      )
                    )
                  }
                </CardColumns>
              ) : (
                <h3>I don't have any items in my porfolio</h3>
              )}
              {/* </Row> */}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Profile;
