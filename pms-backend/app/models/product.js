const sql = require("./dbConnection.js");

const Product = function(product) {
  this.name = product.name;
  this.price = product.price.toFixed(2);
  this.promoActive = product.active;

  /** 
   * This is treated as percentage off for simplicity,
   *  in reality it can be percentage or dollar amount
   */
  this.discount = product.discount;

  // Only set promo code and price if the promo is active
  if (!!this.promoActive) {
    this.promoCode = product.code;
    this.promoPrice =
      (this.price * (100 - this.discount)/100).toFixed(2);
  }
};

Product.filter = (params, cb) => {

  const buildSqlQuery = (params) => {
    let query = "SELECT * FROM products";
    if (params.promoCode) {
      query += " JOIN product_promotions pp ON products.id = pp.product_id " +
        "JOIN promotions p ON pp.promotion_id = p.id " +
        `AND p.active = true AND p.code = '${params.promoCode}'`;
    } else {
      query += " LEFT OUTER JOIN product_promotions pp ON products.id = " +
        "pp.product_id LEFT OUTER JOIN promotions p ON pp.promotion_id = p.id";
    }
    let joiner = "WHERE";
    if (params.departmentId) {
      query += ` WHERE products.department_id = ${params.departmentId}`;
      joiner = "AND";
    }
    if (params.name) {
      query += ` ${joiner} products.name LIKE '%${params.name}%'`;
    }
    query += " ORDER BY products.name";
    return query;
  }

  sql.query(buildSqlQuery(params), (err, res) => {
    if (err) {
      cb(err);
      return;
    }

    const products = res.map(row => new Product(row));
    cb(null, products);
  });
};

module.exports = Product;