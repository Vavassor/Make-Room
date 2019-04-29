import React, {Component} from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Auth from "../../utilities/Auth";

import "./navTabs.css";

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
            Profile
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
        <li className="nav-item ml-auto">
          <Link to="/" className="log-out">
            <Button
              variant="warning"
              type="button"
              onClick={() => this.handleLogOut()}
            >
              <span className="d-none d-sm-block">Log Out</span>
              <span className="d-block d-sm-none">
                <i className="fas fa-ban" aria-hidden="true"></i>
                <span className="sr-only">Log Out</span>
              </span>
            </Button>
          </Link>
        </li>
      </>
    );
  }

  render = () => {
    return (
      <>
        {!this.props.showLoggedIn ? "" : 
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to="/"
                onClick={() => this.setPage("/profile")}
              >
                <img className="nav-logo" src="/images/logo.png" alt="Home" />
              </Link>
            </li>
            {this.renderNavTabs()}
          </ul>
        }
      </>
    );
  }
}

export default NavTabs;
