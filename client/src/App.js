import AddEvent from "./pages/AddEvent";
import ChatIndex from "./pages/ChatIndex";
import CreateAccount from "./pages/CreateAccount";
import Event from "./pages/Event";
import EventList from "./pages/EventList";
import Main from "./pages/Main";
import NavTabs from "./components/NavTabs";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdate from "./pages/ProfileUpdatePage";
import PageNotFound from "./pages/PageNotFound";
import React, { Component } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
          <NavTabs/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/chatIndex" component={ChatIndex} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route exact path="/event-list" component={EventList} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/update" component={ProfileUpdate} />
            <Route component={PageNotFound} />
          </Switch>
      </Router>
    );
  }
}

export default App;
