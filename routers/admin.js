const route = require("express").Router();
const adminController = require("../controllers/adminController");

route.post("/", adminController.createAdmin);

module.exports = route;
