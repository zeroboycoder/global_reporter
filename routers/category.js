const route = require("express").Router();
const categoryController = require("../controllers/categoryController");

route.get("/", categoryController.fetchCategory);

route.post("/", categoryController.createCategory);

route.put("/:categoryId", categoryController.updateCategory);

route.delete("/:categoryId", categoryController.deleteCategory);

module.exports = route;
