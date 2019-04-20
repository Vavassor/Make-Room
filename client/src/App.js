import React, { Component } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import Main from "./pages/Main";
import AddEvent from "./pages/AddEvent";
import CreateAccount from "./pages/CreateAccount";
import Event from "./pages/Event";
import EventList from "./pages/EventList";
import ProfilePage from "./pages/ProfilePage";
import ProfilePageView from "./pages/ProfilePageView";
import PageNotFound from "./pages/PageNotFound";
import NavTabs from "./components/NavTabs";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {

  render() {
    return (
      <>
        <Router>
            <NavTabs />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/add-event" component={AddEvent} />
              <Route exact path="/create-account" component={CreateAccount} />
              <PrivateRoute exact path="/event-list" component={EventList} />
              <PrivateRoute exact path="/event/:id" component={Event} />
              <PrivateRoute exact path="/profile" component={ProfilePage} />
              <PrivateRoute exact path="/profile/:id" component={ProfilePageView} />
              <Route component={PageNotFound} />
            </Switch>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;
