import React, {Component} from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Auth from "../../utilities/Auth";

import "./navTabs.css";
// import { auth } from "firebase";



class NavTabs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "",
    };
  }

  setPage = (newPage) => {
    this.setState({page: newPage});
  }
  
  componentDidMount = () => {
    this.setState({page: window.location.pathname});
  }

  handleLogOut = () => {
    this.setPage("/");
    Auth.logOut();
    this.props.handleLogOut();
  }

  renderNavTabs =() => {
    return (
      <>
        <li className="nav-item">
          <Link
            to="/profile"
            onClick={() => this.setPage("/profile")}
            className={
              this.state.page === "/profile"
                ? "nav-link active"
                : "nav-link"
            }
          >
            profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/event-list"
            onClick={() => this.setPage("/event-list")}
            className={
              this.state.page === "/event-list"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Events
          </Link>
        </li>
        <li>
          <Link to="/">
            <Button
              variant="warning"
              type="button"
              onClick={() => this.handleLogOut()}
            >
              Log Out
            </Button>
          </Link>
        </li>
      </>
    );
  }

  render = () => {
    return (
      <>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              to="/"
              onClick={() => this.setPage("/")}
              className={
                this.state.page === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
          </li>
          {!this.props.showLoggedIn ? "" : this.renderNavTabs()}
        </ul>
      </>
    );
  }
}

export default NavTabs;
