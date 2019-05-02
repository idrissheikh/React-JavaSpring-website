import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";
//import ProductForm from "./ProductForm";
import Test from "../../components/test";
//import { BrowserRouter, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import API from "../../services/api";
import { getProducts } from "../../store/action/actions";

class Products extends Component {
  delete = id => {
    API.deleteProduct(id)
      .then(() => this.props.getAllProducts())
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.props.getAllProducts();
  }

  render() {
    const shoes = this.props.products.filter(
      products => products.category === "shoes"
    );
    const mobiles = this.props.products.filter(
      products => products.category === "mobile"
    );

    return (
      <div className="body">
        <div className=" btn-container">
          {this.props.user && this.props.user.role == "ADMIN" && (
            <Link to="/productForm">
              <button
                onClick={this.navigateProductForm}
                className="btn btn-success btn-lg mr-5 my-3 "
              >
                Add Product
              </button>
            </Link>
          )}
        </div>
        <Test title="ادريس " />
        <ProductList delete={this.delete} products={shoes} />
        <ProductList delete={this.delete} products={mobiles} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.rootReducer.products,
    user: state.rootReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
