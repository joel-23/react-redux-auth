import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated };
};

const RedirectRoute = ({ Component, isAuthenticated, redirect }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? <Redirect to={redirect} /> : <Component />;
};

export default connect(mapStateToProps, null)(RedirectRoute);
