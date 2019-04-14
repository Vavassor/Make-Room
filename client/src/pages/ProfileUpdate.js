import React, {Component} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import ProfileForm from "../components/ProfileForm";


class ProfileUpdate extends Component {


  render() {
    return (
      <main>
        <Jumbotron>
          <h1>This is the profile modification page!</h1>
        </Jumbotron>
        <ProfileForm/>
      </main>
    );
  }
}

export default ProfileUpdate;