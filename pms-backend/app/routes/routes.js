module.exports = app => {
  const controllers = require("../controllers");

  // Filter products
  app.get("/products", controllers.productsController.filter);

  // Get all departments
  app.get("/departments", controllers.departmentsController.getAll);
};