import React, { Component } from "react";
// import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

// bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// utils
import Api from "../../utilities/Api";

// css
import "./profileForm.css";


class ProfileForm extends Component {

  state = {
    id: "",
    username:"",
    firstname:  "",
    lastname: "",
    email: "",
    blurb: "",
    website:"",
    
  };

  componentDidMount() {
    console.log(this.props);
    Api
    .getSelf()
    .then((response) => {
      const {id, username} = response.data;
      this.getUserInfo(id);
      this.setState({
        id: id,
        username: username
      });
    })
    .catch(error => console.error(error));
  };

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

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let userInfo = {...this.state}
    delete userInfo.id
    delete userInfo.username
    const {id} = this.state

    Api
    .updateUserProfile(id, userInfo)
    .then(result => console.log(result))
    .catch(err => console.error(err))
  };
  

  resetForm =() => {
    this.setState({ profileInfo: {} })
  };

  render(){
    return (
      <>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Row className="my-2">
                  <Col xs={6}>
                  <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                      name="firstname"
                    />
                  </Col>
                  <Col xs={6}>
                  <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                      name="lastname"
                    />
                  </Col>
                  </Row>
                  <Row className="my-2">
                  <Col xs={6}>
                  <Form.Label>Youre Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      name="email"
                    />
                  </Col>
                  <Col xs={6}>
                  <Form.Label>Your Web Site</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="WebAddress"
                      value={this.state.website}
                      onChange={this.handleInputChange}
                      name="website"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Blurb</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows="3"
                  placeholder="Pithy Statement 50 Characters or less"
                  maxLength="50"
                  value={this.state.blurb}
                  onChange={this.handleInputChange}
                  name="blurb"
                />
              </Form.Group>
              {/* <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>About You</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="What's Your Story?" />
        </Form.Group> */}
              {/* <FormControl id="formControlsFile"
          type="file" multiple label="File" /> */}
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Submit
              </Button>
            </Form>
      </>
    );
  }
}
export default ProfileForm;


