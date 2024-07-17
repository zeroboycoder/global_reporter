const route = require("express").Router();
const adminController = require("../controllers/adminController");

// route.get("/", categoryConadminControllertroller.fetchCategory);

route.post("/", adminController.createAdmin);

// route.put("/:categoryId", categoryController.updateCategory);

// route.delete("/:categoryId", categoryController.deleteCategory);

module.exports = route;
