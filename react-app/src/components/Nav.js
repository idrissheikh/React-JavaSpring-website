import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProductForm from "./products/ProductForm";
import DataService from "../services/dataService";
import { setUser } from "../store/action/actionBundle";
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  handleLogout = () => {
    this.props.setUser(null);
  };

  render() {
    const loggedUser = DataService.getLoggedUser();
    console.log("logged user render: ", loggedUser);
    return (
      <div className="navbar">
        <div className="col-md-1  navlist">
          <a className="logo">logo</a>
        </div>
        <div className="col-md-9 justuft-content-around ">
          <NavLink className="mx-2" exact to="/">
            Home
          </NavLink>
          <NavLink className="mx-2" to="/products">
            Products
          </NavLink>
          <NavLink className="mx-2" to="/about">
            About
          </NavLink>
          <NavLink className="mx-2" to="/register">
            register
          </NavLink>
        </div>

        <div className="col-md-1 ml-auto ">
          <input className="input" type="text" name="FirstName" />
        </div>
        {!this.props.user && (
          <div className="col-md-1 ml-auto ">
            <NavLink className="logIn" exact to="/logIn">
              logIn
            </NavLink>
          </div>
        )}

        {this.props.user && (
          <div className="col-md-1 ml-auto ">
            <button
              onClick={() => this.handleLogout()}
              className="out"
              exact
              to="/logIn"
            >
              Logg ut
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
