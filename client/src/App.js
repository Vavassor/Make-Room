import React, { Component } from "react";
import "./App.css";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import NavTabs from "./components/NavTabs";
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
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
