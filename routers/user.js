const route = require("express").Router();
const usercontroller = require("../controllers/userController");

route.get("/", usercontroller.fetchUsers);

module.exports = route;
