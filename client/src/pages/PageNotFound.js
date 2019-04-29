import React, {Component} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

class PageNotFound extends Component {

  returnHome = () =>  {this.props.history.push('/')}

  render() {
    return (
      <>
      <Jumbotron className='text-center'>
        <h1>Page not found

        <button type='button' className='btn btn-info ml-2 mb-2' onClick={this.returnHome}>Home</button>
        </h1>
      </Jumbotron>
      <img style={{margin: "auto", display: "block"}} src="https://media.giphy.com/media/9mJwt7U9UraMM/giphy.gif" alt='page not found gif'/>
      </>
    );
  }
}

export default PageNotFound;