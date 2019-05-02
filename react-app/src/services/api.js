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

  static getshippingById(id) {
    let url = "http://localhost:9998/shipping/" + id;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(shipping => resolve(shipping))
        .catch(error => reject(error));
    });
  }

  static postShipping(shipping) {
    let url = "http://localhost:9998/shipping";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(shipping), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static updateShipping(shippingId, userId, shipping) {
    let url =
      "http://localhost:9998/updateShipping/id=" +
      shippingId +
      "&user_id=" +
      userId;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(shipping), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static putShipping(shipping) {
    let url = "http://localhost:9998/shipping/" + shipping.id;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(shipping), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static decreaseProductQuantity(id) {
    let url = "http://localhost:9997/products/decrease/" + id;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(shipping => resolve(shipping))
        .catch(error => reject(error));
    });
  }

  static postOrder(body) {
    return new Promise((resolve, reject) => {
      let url = "http://localhost:7070/orders";
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

  static getOrderHistoryByUser(userId) {
    console.log("recieved id: " + userId);
    let url = `http://localhost:7070/orderHistory/user/${userId}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(response => {
          let orderHistory = [];
          for (let data of response) {
            let order = {};
            order["date"] = data.date;
            order["quantity"] = Object.keys(data.productList).length;
            let products = [];
            for (let id of data.productList) {
              API.getAllProductById(id).then(product => products.push(product));
            }

            const totalAmount = API.getTotalPrice(products);
            order["totalAmount"] = totalAmount;
            console.log("current order: ", order);
            order["products"] = products;
            console.log("p before push ", products);
            orderHistory.push(order);
          }
          console.log("before resolve: ", orderHistory);

          resolve(orderHistory);
        })
        .catch(err => reject(err));
    });
  }

  // Help methods
  static getTotalPrice(products) {
    products.map((products, key) => console.log(products));
  }

  static deleteUser(id) {
    let url = "http://localhost:9090/user/" + id;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE" // or 'PUT'
      })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static updateUser(user) {
    let url = "http://localhost:9090/user/" + user.id;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(user), // data can be `string` or {object}!
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
