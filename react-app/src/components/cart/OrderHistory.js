import React, { Component } from "react";
import { connect } from "react-redux";
import Test from "./test";
import API from "../../services/api";
import { getOrderHistory } from "../../store/action/actions";

class OrderHistory extends Component {
  state = {
    myOrders: []
  };

  componentWillMount() {
    console.log("inside will mount .. orderhistory");
    const id = this.props.user ? this.props.user.id : 2;
    this.props.getOrderHistory(id);
    API.getOrderHistoryByUser(2).then(orders =>
      this.setState({ myOrders: orders }, () =>
        console.log("update state: ", this.state.myOrders)
      )
    );
  }

  renderProductList = products => {
    console.log("renderP: ", products);

    products.map((product, key) => <td>{products[key].name}</td>);
  };

  render() {
    return (
      <div>
        <div className="col-sm-8 mx-auto my-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Products</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myOrders.map((order, key) => (
                <tr>
                  <th scope="row">{order.date}</th>
                  {this.renderProductList(order.products)}
                  <td>{order.quantity}</td>
                  <td>{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.rootReducer.products,
    user: state.rootReducer.user,
    orderHistory: state.rootReducer.orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: id => dispatch(getOrderHistory(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
