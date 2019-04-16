import React, { Component } from "react";
import "./App.css";
import CreateAccount from "./pages/CreateAccount";
import Main from "./pages/Main";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdate from "./pages/ProfileUpdatePage";
import ChatIndex from "./pages/ChatIndex";
import PageNotFound from "./pages/PageNotFound";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import NavTabs from "./components/NavTabs";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";


class App extends Component {
  render() {
    return (
      <Router>
          <NavTabs/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/chatIndex" component={ChatIndex} />
            <Route exact path="/create-account" component={CreateAccount} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/update" component={ProfileUpdate} />
            <Route component={PageNotFound} />
          </Switch>
      </Router>
    );
  }
}

export default App;
