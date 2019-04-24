import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl } from "react-bootstrap";
import "./User.css";
import API from "../../services/api";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = (event, key) => {
    console.log("value you are typing: ", event.target.value);
    console.log("updating: ", event.target.id);
    this.setState({
      [key]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    console.log("new user: ", user);

    this.setState({ isLoading: true });
    API.postUser(user)
      .then(newUser => {
        console.log("new User: ", newUser);
        this.setState({
          isLoading: false,
          newUser
        });
      })

      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          newUser: null
        });
      });

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  };

  /* renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <div>Email</div>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <div>Password</div>
          <div
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <div>Confirm Password</div>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }
*/

  render() {
    return (
      <div className="signup-form">
        <form method="post" onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <p className="hint-text">
            Create your account. It's free and only takes a minute.
          </p>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-6">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="First Name"
                  required="required"
                  value={this.state.firstName}
                  onChange={event => this.handleChange(event, "firstName")}
                />
              </div>
              <div className="col-xs-6">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  required="required"
                  value={this.state.lastName}
                  onChange={event => this.handleChange(event, "lastName")}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={event => this.handleChange(event, "email")}
            />
          </div>
          <div className="form-group" bsSize="large">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={event => this.handleChange(event, "password")}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              required="required"
              value={this.state.confirmPassword}
              onChange={event => this.handleChange(event, "confirmPassword")}
            />
          </div>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" required="required" /> I accept the{" "}
              <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block">
              Register Now
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account? <a href="#">Sign in</a>
        </div>
      </div>
    );
  }
}

export default Register;
