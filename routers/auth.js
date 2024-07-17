const route = require("express").Router();
const adminController = require("../controllers/adminController");

route.post("/login", adminController.loginAdmin);

module.exports = route;
