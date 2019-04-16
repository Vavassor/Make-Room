import React, {Component} from "react";
// import Basic from "../components/FormikForm";

// react components
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// custom components
import ProfileForm from "../components/ProfileForm/ProfileFormComponent"


// utils
import Api from "../utilities/Api";



class ProfileUpdate extends Component {
  state ={
    username: "",
    id: "",
  }

  componentDidMount() {
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


  render() {
    return (
      <main>
        <Jumbotron className="text-center">
          <h1>This is the {this.state.username} profile modification page!</h1>
        </Jumbotron>
        <Row className="justify-content-center">
          <Col sm={6}>
            <ProfileForm />
          </Col>
        </Row>
        {/* <Basic/> */}
      </main>
    );
  }
}

export default ProfileUpdate;

