import React, { Component } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import Main from "./pages/Main";
import AddEvent from "./pages/AddEvent";
import Event from "./pages/Event";
import EventList from "./pages/EventList";
import ProfilePage from "./pages/ProfilePage";
import ProfilePageView from "./pages/ProfilePageView";
import PageNotFound from "./pages/PageNotFound";
import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Auth from "./utilities/Auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoggedIn: false,
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      showLoggedIn: Auth.isAuthenticated(),
    })
  }

  handleLogIn() {
    this.setState({showLoggedIn: true});
  }

  handleLogOut() {
    this.setState({showLoggedIn: false});
  }

  loggedInRoutes() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Main {...props} handleLogIn={this.handleLogIn} isLoggedIn={this.state.showLoggedIn} />
        )} /> 
        <Route exact path="/add-event" component={AddEvent} />
        <Route exact path="/event-list" component={EventList} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/profile/:id" component={ProfilePageView} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }

  loggedOutRoutes() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Main {...props} handleLogIn={this.handleLogIn} isLoggedIn={this.state.showLoggedIn} />
        )} />
        <Route exact path="/add-event" component={AddEvent} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <>
        <div className="above-footer">
          <Router>
            <NavTabs
              showLoggedIn={this.state.showLoggedIn}
              handleLogOut={this.handleLogOut}
            />
            {this.state.showLoggedIn ? this.loggedInRoutes() : this.loggedOutRoutes()}
          </Router>
        </div>
        <Footer/>
      </>
    );
  }
}

export default App;
