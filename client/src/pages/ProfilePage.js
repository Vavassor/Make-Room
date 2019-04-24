import React, {Component} from "react";
import { Link } from "react-router-dom";


import moment from "moment";


// bootstrap components
// import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";


//custom components
import ProfileCard, { ProfileInfoCard } from "../components/ProfileCard";
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
      imageOrder: "",
      events:"",
      columnCount: 3,
      columnGap: 20,
    };
  }



  componentDidMount() {
    Api
    .getSelf()
    .then((response) => {
      const {id, username} = response.data;
      this.getProfilePortfolio(id)
      this.getUserInfo(id);
      this.getUserEvents(id);
      this.setState({
        id: id,
        username: username
      });
    })
    .catch(error => console.error(error));
  };

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
      let cols = data.data[0].porfolioaDisplayType.split("::")
      this.setState({
        portfolio: data.data[0].images,
        portfolioInfo:data.data[0].portfolioDetails,
        columnCount: parseInt(cols[0]),
        columnGap: parseInt(cols[1])
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

  handleColumnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({[name]: value}, 
      () => {
        this.setColumnCount(this.state.columnCount)
      });
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
    .updatePortfolioInfo(id, {portfolioInfo:portfolioInfo})
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

  setColumnCount = () => {
    let {id, columnCount, columnGap} = this.state

    columnCount = `${columnCount}::${columnGap}`

    Api
    .updatePortfolioInfo(id, {columnCount: columnCount})
    .then(data => { 
    })
    .catch(err => console.log(err))
  };

  setAsFirst = (id) => {
    let newOrder = moment(Date.now()).toISOString()
    let portfolioItem = {
      _id: id,
      order: newOrder
    };
    
    Api
    .updatePortfolioItem(this.state.id, portfolioItem)
    .then(data => {
      this.getProfilePortfolio(this.state.id);
    })
    .catch(err => console.log(err))
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
  }
  

  render() {

    let cEvents = [...this.state.events]

    return (
      <>
        <Jumbotron className="profile-jumbo fluid mx-0">
          <Row className="justify-content-center text-center">
            <Col className="jumbo-header" sm={6}>
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
          <Row className="justify-content-center about-me-row mb-2">
            <Col className="text-center" xs={6}>
              <Dropdown>
                <Dropdown.Toggle
                  className="mb-2"
                  variant="success"
                  id="events-attending-dropdown"
                >
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
              <ProfileInfoCard
                portfolioTitle={"About My Work"}
                updateButton={
                  <UpdateModal
                    task="Update Portfolio Info"
                    form={"portfolioInfo"}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleSubmitPortfolioInfo}
                    portfolioInfo={this.state.portfolioInfo}
                  />
                }
              >
                {this.state.portfolioInfo
                  ? Help.addLineBreaks(this.state.portfolioInfo)
                  : "Oops, I haven't added any info about my porfolio"}
              </ProfileInfoCard>
            </Col>
          </Row>
          <Row className="justify-content-center portfolio-images">
            <Col className="text-center">
              <ItemButton
                action={this.createNewPortfolioItem}
                size="sm"
                variant="primary"
              >
                Add New Portfolio Item <i className="far fa-plus-square" />
              </ItemButton>
              <label className="ml-3">
                <select
                  name="columnCount"
                  value={this.state.columnCount}
                  onChange={this.handleColumnChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                #Columns
              </label>
              <label className="ml-3">
                <select
                  name="columnGap"
                  value={this.state.columnGap}
                  onChange={this.handleColumnChange}
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
                Gap
              </label>
            </Col>

            <Col xs={12} className="mt-2">
              {this.state.portfolio.length ? (
                <MasonryLayout
                  columns={parseInt(this.state.columnCount)}
                  gap={parseInt(this.state.columnGap)}
                >
                  {Help.sortByDate([...this.state.portfolio]).map(
                    imageInfo => (
                      <ProfileCard
                        key={imageInfo._id}
                        image={imageInfo}
                        imgId={imageInfo._id}
                      >
                        {/* <Row className='justify-content-center p-0 m-0'> */}
                          {/* <Col className='text-center' xs={"auto"}> */}
                            <ItemButton
                              size="sm"
                              variant={"primary"}
                              action={() => this.setAsFirst(imageInfo._id)}
                            >
                              <i className="fas fa-arrow-up"></i>
                            </ItemButton>
                          {/* </Col> */}
                          {/* <Col className='text-center' xs={"auto"}> */}
                            <UpdateModal
                              form={"itemInfo"}
                              task={"Update Item"}
                              variant="primary"
                              icon={<i className="far fa-edit"></i>}
                              handleInputChange={this.handleInputChange}
                              handleFormSubmit={
                                this.handleSubmitPortfolioItem
                              }
                              item={this.state}
                              func2={this.setItemState}
                              func2Args={imageInfo}
                              imageInfo={imageInfo}
                            />
                          {/* </Col> */}
                          {/* <Col className='text-center' xs={"auto"}> */}
                            <ItemButton
                              size="sm"
                              variant={"danger"}
                              action={() =>
                                this.deletePortfolioItem(imageInfo._id)
                              }
                            >
                              <i className="far fa-trash-alt" />
                            </ItemButton>
                          {/* </Col> */}
                        {/* </Row> */}
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

  renderEventList =(event) => {
    return <Link className='dropdown-item' to={"/event/" + event.id} key={event.id}><p className="user-event-li">{event.name}</p></Link>
  }

}
export default Profile;
