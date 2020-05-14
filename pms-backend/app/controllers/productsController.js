const Product = require("../models/product.js");

exports.filter = (req, res) => {
  Product.filter(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Eror occurred while retrieving products."
      });
    else {
      res.send(data);
    }
  });
};