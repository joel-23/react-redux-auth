import React from "react";
import { Switch, Route } from "react-router-dom";
import RedirectRoute from "./lib/RedirectRoute";
import Home from "./views/Home";
import Profile from "./views/Profile";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <RedirectRoute
        exact
        path="/sign-in"
        Component={SignIn}
        redirect="/profile"
      />
      <RedirectRoute
        exact
        path="/sign-up"
        Component={SignUp}
        redirect="/profile"
      />
      {/* <Route exact path="/sign-in" component={SignIn} /> */}
      {/* <Route exact path="/sign-up" component={SignUp} /> */}
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
};

export default Routes;
