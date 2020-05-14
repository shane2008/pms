const Department = require("../models/department.js");

exports.getAll = (req, res) => {
  Department.all((err, data) => {
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