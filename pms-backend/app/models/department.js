const sql = require("./dbConnection.js");

const Department = function(department) {
  this.id = department.id;
  this.name = department.name;
};

Department.all = (cb) => {
  sql.query("SELECT * from departments ORDER by name", (err, res) => {
    if (err) {
      cb(err);
      return;
    }

    const departments = res.map(row => new Department(row));
    cb(null, departments);
  });
};

module.exports = Department;