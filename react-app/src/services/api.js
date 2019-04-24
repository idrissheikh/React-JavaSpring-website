export default class API {
  // returns Promise
  // .then .catch
  static getAllProducts() {
    let url = "http://localhost:9997/products";
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(products => resolve(products))
        .catch(error => reject(error));
    });
  }

  static getAllProductById(id) {
    let url = "http://localhost:9997/products/" + id;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(product => resolve(product))
        .catch(error => reject(error));
    });
  }

  static postProduct(body) {
    let url = "http://localhost:9997/products";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static putProduct(body) {
    console.log("received product: ", body);
    let url = "http://localhost:9997/products/" + body.product.id;
    console.log("url: ", url);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static deleteProduct(id) {
    let url = "http://localhost:9997/products/" + id;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE" // or 'PUT'
      })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static getUserById(id) {
    let url = "http://localhost:9997/merchant/" + id;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(merchant => resolve(merchant))
        .catch(error => reject(error));
    });
  }

  static postUser(newUser) {
    let url = "http://localhost:9090/signup";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(newUser), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
