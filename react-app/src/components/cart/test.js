import React, { Component } from "react";
import PaymentForm from "./PaymentForm";
import Shipping from "./ShippingfForm";
import ShippingfForm from "./ShippingfForm";
import products from "../products/ProductList";
import API from "../../services/api";

class Test extends Component {
  state = {
    showShippingForm: false
  };

  pay = () => {
    const user_id = this.props.user.id;
    const date = new Date().toString();

    let productList = [];
    for (let item of this.props.items) {
      console.log("value you are typing: ", item);
      productList.push(item.id);
    }

    const body = {
      user_id,
      date,
      productList
    };

    API.postOrder(body).then(newOrder => {
      for (let id of newOrder.productList) {
        API.decreaseProductQuantity(id).then(() => this.props.getAllProducts());
      }
    });
  };

  renderTab2 = shippings => {
    const size = Object.keys(shippings).length;
    if (size > 0) {
      return shippings.map((shipping, key) => {
        const fullName = shipping[key].firstName + " " + shipping[key].lastName;
        const fullAddress =
          shipping[key].address +
          " " +
          shipping[key].postalCode +
          " " +
          shipping[key].city;
        return (
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item text-primary">{fullName}</li>
              <li class="list-group-item text-dark">{fullAddress}</li>
              <div class="list-group-item text-dark justify-content-around ">
                <div
                  class="input-group "
                  style={{
                    padding: 0,
                    margin: 0
                  }}
                >
                  <div class="input-group">
                    <div class="input-group  row-md-12">
                      <div class="input-group-prepend col-sm-6">
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          style={{ padding: 0, margin: 0, width: "200%" }}
                        >
                          Velg
                        </button>

                        <input
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />
                      </div>
                      <div
                        class="input-group-prepend col-sm-6"
                        style={{
                          padding: 0,
                          margin: 0
                        }}
                      >
                        {/* <Link to="/productForm"> */}
                        <button
                          onClick={() =>
                            this.setState({ showShippingForm: true })
                          }
                          type="button"
                          class="btn btn-outline-primary"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: "100%"
                          }}
                        >
                          Add ny address
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        );
      });

      /*  return (
        
      ); */
    } else {
      return (
        <div>
          <h3 className="text-primary">Fortsett som gjest ... </h3>
          <ShippingfForm
            onShippingAdded={() => this.setState({ showShippingForm: false })}
          />
        </div>
      );
    }
  };

  render() {
    const firstName = this.props.user ? this.props.user.firstName : "";
    const lastName = this.props.user ? this.props.user.lastName : "";
    const adress = this.props.user ? this.props.user.address : "";
    const city = this.props.user ? this.props.user.city : "";
    const postalCode = this.props.user ? this.props.user.postalCode : "";

    console.log("shippingList props: ", this.props.shippingList);
    console.log("shippingList props: ", this.props.user);

    return (
      <div className="">
        <div
          className="col-sm-12"
          style={{
            height: 500
          }}
        >
          <div
            className="card mx-auto"
            style={{ borderWidth: 2, width: "80%" }}
          >
            <div className="card-header collapse show">
              <a
                className="collapsed card-link"
                data-toggle="collapse"
                href="#collapseB"
              />
              <ul className="nav nav-tabs">
                <li className="collapsed card-link">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-1"
                    role="tab"
                  >
                    Order Summary
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-2"
                    role="tab"
                  >
                    Shipping
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-3"
                    role="tab"
                  >
                    Tab 3
                  </a>
                </li>
              </ul>
              <div
                id="collapseB"
                className="card card-tabs-1"
                data-parent="#accordion2"
                style={{ width: "100%" }}
              >
                <div className="card-block ">
                  <div
                    className="tab-content"
                    style={{ borderWidth: 2, borderColor: "yellow" }}
                  >
                    <div
                      className="tab-pane active "
                      id="tab-1"
                      data-parent="#accordion2"
                    >
                      <h4 className="">Tab 1</h4>
                      <div className="col-sm-6  ">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Id</th>
                              <th scope="col">Name</th>
                              <th scope="col">Available</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.items &&
                              this.props.items.map((item, key) => (
                                <tr key={key}>
                                  <th scope="row">{item.id}</th>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.rate}</td>

                                  <td
                                    className="text-danger"
                                    onClick={() => this.props.removeItem(item)}
                                  >
                                    <i className="fas fa-trash" />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-2" style={{ flex: 1 }}>
                      <div
                        style={{
                          height: null,
                          backgroundColor: "white",
                          borderWidth: 2,
                          borderColor: "red"
                        }}
                      >
                        {this.state.showShippingForm && (
                          <ShippingfForm
                            onShippingAdded={() =>
                              this.setState({ showShippingForm: false })
                            }
                          />
                        )}
                        {!this.state.showShippingForm &&
                          this.renderTab2(this.props.shippingList)}

                        {/* {this.props.shippingList.map((shipping, key) => (
                          <div class="card" style={{ backgroundColor: "blue" }}>
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <h6 class="card-subtitle mb-2 text-muted">
                                Card subtitle
                              </h6>
                              <p class="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </p>
                              <a href="#" class="card-link">
                                Card link
                              </a>
                              <a href="#" class="card-link">
                                Another link
                              </a>
                            </div>
                          </div>
                        ))} */}
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-3">
                      <PaymentForm pay={this.pay} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
