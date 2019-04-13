import React from "react";
import {Redirect, Route} from "react-router-dom";
import Auth from "../utilities/Auth";

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return Auth.isAuthenticated()
          ? <Component {...props} />
          : <Redirect to="/" />
      }}
    />
  );
};

export default PrivateRoute;