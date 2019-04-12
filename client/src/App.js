import React, { Component } from "react";
import "./App.css";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/profile" component={Profile} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
