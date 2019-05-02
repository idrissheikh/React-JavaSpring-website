import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../services/api";
import { getOrderHistory, setUser } from "../../store/action/actions";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "Idris",
      lastName: "Hamid",
      address: "",
      postalCode: "",
      shippingId: "",
      updatConfirmation: false,
      deleteConfirmation: false
    };
  }

  deleteAccount = () => {
    API.deleteUser(this.props.user.id).then(() => {
      this.setState({ deleteConfirmation: true });
      setTimeout(() => {
        this.setState({ deleteConfirmation: false }, () => {
          this.props.setUser(null);
          this.props.history.push("/login");
        });
      }, 3000);
    });
  };

  profileChange = (event, key) => {
    console.log("value you are typing: ", event.target.value);
    console.log("updating: ", event.target.id);
    this.setState({
      [key]: event.target.value
    });
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  profileSubmit = async event => {
    event.preventDefault();

    let updatedUser = this.props.user;
    updatedUser["firstName"] = this.state.firstName;
    updatedUser["lastName"] = this.state.lastName;

    let updateShipping = {
      id: this.state.shippingId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      postalCode: this.state.postalCode,
      user_id: this.props.user.id
    };

    API.putShipping(updateShipping).then(() =>
      API.updateUser(updatedUser).then(() => {
        this.setState({ updatConfirmation: true });
        setTimeout(() => {
          this.setState({ updatConfirmation: false });
        }, 4000);
      })
    );
  };

  componentWillMount() {
    const id = this.props.user.id;
    API.getshippingById(id)
      .then(shippingInfo => {
        this.setState({
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          shippingId: shippingInfo.id
        });
      })
      .catch(err => console.log(err));
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email
    });
  }

  render() {
    console.log(this.state.firstName);
    return (
      <div className="signup-form">
        {this.state.deleteConfirmation && (
          <div class="alert alert-success mx-auto" role="alert">
            <h3 className="text-danger">
              Your account has been parmenantly deleted
            </h3>
          </div>
        )}
        {this.state.updatConfirmation && (
          <div class="alert alert-success mx-auto" role="alert">
            Your profile has been successfully updated
          </div>
        )}
        <form onSubmit={this.profileSubmit}>
          <h2>Profile</h2>

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
                  onChange={event => this.profileChange(event, "firstName")}
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
                  onChange={event => this.profileChange(event, "lastName")}
                />
              </div>
            </div>
          </div>

          <div className="form-group" bsSize="large">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={this.state.address}
              onChange={event => this.profileChange(event, "address")}
            />
          </div>
          <div className="form-group" bsSize="large">
            <input
              type="text"
              className="form-control"
              placeholder="city"
              value={this.state.city}
              onChange={event => this.profileChange(event, "city")}
            />
          </div>
          <div className="form-group" bsSize="large">
            <input
              type="text"
              className="form-control"
              placeholder="postalcode"
              value={this.state.postalCode}
              onChange={event => this.profileChange(event, "postalCode")}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block">
              UPDATE
            </button>
          </div>
        </form>

        <div className="form-group">
          <button
            onClick={this.deleteAccount}
            className="btn btn-danger btn-lg btn-block"
          >
            DELETE ACCOUNT
          </button>
        </div>
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
    getOrderHistory: id => dispatch(getOrderHistory(id)),
    setUser: user => dispatch(setUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
