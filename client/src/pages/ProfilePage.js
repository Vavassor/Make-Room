import React, {Component} from "react";

// bootstrap components
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


//custom components
import ProfileCard from "../components/ProfileCard";
import { ItemButton } from "../components/ButtonComponent"

//custom components
import UpdateModal from "../components/UpdateModal"
import MasonryLayout from "../components/MasonryLayout"



// utils
import Api from "../utilities/Api";
import Help from "../utilities/Helpers";

// css library
import "./pages.css"


class Profile extends Component {
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
  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(name,": ",  value)
    this.setState({[name]: value});
  };

  handleFormSubmitProfile = event => {
    event.preventDefault();
    let user = {...this.state}
    let userInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      blurb: user.blurb,
      website: user.website,
      email: user.email
    }
    let {id} = user

    Api
    .updateUserProfile(id, userInfo)
    .catch(err => console.error(err))
  };

  handleSubmitPortfolioInfo = event => {
    event.preventDefault();
    let {id, portfolioInfo} = this.state;
    Api
    .updatePorfolioInfo(id, {portfolioInfo:portfolioInfo})
    .catch(err => console.log(err))
  };

  handleSubmitPortfolioItem = event => {
    event.preventDefault();
    let {imageId, imageUrl, imageTitle, imageAbout, imageOrder} = this.state
    let portfolioItem = {
      _id: imageId,
      url: imageUrl,
      title: imageTitle,
      about: imageAbout,
      order: imageOrder
    };
    
    Api
    .updatePortfolioItem(this.state.id, portfolioItem)
    .then(data => {
      this.getProfilePortfolio(this.state.id);
    })
    .catch(err => console.log(err))
  };

  createNewPortfolioItem = (event) => {
    event.preventDefault();
    Api
    .addPortfolioItem(this.state.id)
    .then(data => {
      this.getProfilePortfolio(this.state.id);
    })
    .catch(err => console.error(err))
  };

  deletePortfolioItem = (itemId) => {
    Api
    .deletePortfolioItem(this.state.id, itemId)
    .then(data => { this.getProfilePortfolio(this.state.id) })
    .catch(err => console.error(err))
  }

  setItemState = (item) => {
    this.setState({
      imageUrl: item.url,
      imageTitle: item.title,
      imageAbout: item.about,
      imageId: item._id,
      imageOrder: item.order,
    })
  };


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
                handleFormSubmit={this.handleFormSubmitProfile}
                userInfo={this.state}
              />
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-1">
            <Col sm={6}>
              <h5>{Help.addLineBreaks(this.state.blurb)}</h5>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
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
            <Col xs={12}>
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
                  <div>
                    {this.state.portfolioInfo ? (
                      Help.addLineBreaks(this.state.portfolioInfo)
                    ) : (
                      <p>
                        Oops, I haven't added any info about my porfolio
                      </p>
                    )}
                    <UpdateModal
                      task="Update Portfolio Info"
                      form={"portfolioInfo"}
                      handleInputChange={this.handleInputChange}
                      handleFormSubmit={this.handleSubmitPortfolioInfo}
                      portfolioInfo={this.state.portfolioInfo}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col xs={12}>
              {this.state.portfolio.length ? (
                <MasonryLayout columns={Help.colNum(this.state.portfolio.length)} gap={25}>
                  {Help.sortByDate([...this.state.portfolio]).map(
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
                          handleFormSubmit={this.handleSubmitPortfolioItem}
                          item={this.state}
                          func2={this.setItemState}
                          func2Args={imageInfo}
                          imageInfo={imageInfo}
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
                  )}
                </MasonryLayout>
              ) : (
                <h3>I don't have any items in my porfolio, Yet.</h3>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Profile;
