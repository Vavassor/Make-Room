import React, { Component } from "react";
import "./App.css";
import CreateAccount from "./pages/CreateAccount";
import EventList from "./pages/EventList";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import ChatIndex from "./pages/ChatIndex";
import PageNotFound from "./pages/PageNotFound";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import NavTabs from "./components/NavTabs/NavTabs";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <NavTabs/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/chatIndex" component={ChatIndex} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route exact path="/event-list" component={EventList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/update" component={ProfileUpdate} />
            <Route component={PageNotFound} />
          </Switch>
      </Router>
    );
  }
}

export default App;
