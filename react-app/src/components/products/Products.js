import React, { Component } from "react";
import ProductList from "./ProductList";
//import ProductForm from "./ProductForm";
import Test from "../../components/test";
//import { BrowserRouter, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import API from "../../services/api";

class Products extends Component {
  state = {
    products: [],
    user: {
      role: "ADMIN"
    }
  };

  componentDidMount = () => {
    this.getAllProducts();
  };

  getAllProducts = () => {
    API.getAllProducts()
      .then(products => this.setState({ products: products }))
      .catch(err => console.log(err));
  };

  delete = id => {
    API.deleteProduct(id)
      .then(() => this.getAllProducts())
      .catch(err => console.log(err));
  };

  render() {
    const shoes = this.state.products.filter(
      products => products.category === "shoes"
    );
    const mobiles = this.state.products.filter(
      products => products.category === "mobile"
    );

    return (
      <div className="body">
        <div className=" btn-container">
          {this.state.user.role == "ADMIN" && (
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

export default Products;
