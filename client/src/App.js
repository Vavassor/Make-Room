import React, { Component } from "react";
import "./App.css";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import ProfileCreate from "./pages/ProfileCreate";
import ChatIndex from "./pages/ChatIndex";
import PageNotFound from "./pages/PageNotFound";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import NavTabs from "./components/NavTabs";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <Router>
        <NavTabs/>
        <Container>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/chatIndex" component={ChatIndex} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/profile/create" component={ProfileCreate} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
