import React, { Component } from "react";
import "../../App.css";
import API from "../../services/api";

class ProductForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    // henter data
    const data = new FormData(form);
    // lager en tom formData
    let formData = {};

    for (let key of data.keys()) {
      const value = form.elements[key].value;
      // fyller formData
      formData[key] = value;
    }

    formData["rate"] = 0;
    const merchant = {
      fristName: "Salem",
      lastName: "ali",
      email: "idris@olsomet.no",
      passWord: "idris"
    };
    // body ekseserer begge product og merchant
    const body = {
      product: formData,
      merchant
    };

    console.log("data: ", formData);
    console.log("body to post: ", body);
    API.postProduct(body)
      .then(newProduct => this.props.history.push("/products"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="col-sm-6 my-3 mx-auto ml">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-container">
            <label className="mr-auto ml-0">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter product name "
            />
          </div>
          <div className="form-group">
            <label>Quantity </label>
            <input
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Enter quantity "
            />
          </div>
          <div className="form-group">
            <label>Category </label>
            <input
              name="category"
              type="text"
              className="form-control"
              placeholder="Enter category "
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
