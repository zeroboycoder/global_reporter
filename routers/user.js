const route = require("express").Router();
const usercontroller = require("../controllers/userController");

route.get("/", usercontroller.fetchUsers);

route.get("/:userId", usercontroller.fetchUserDetail);

route.get("/:userId/notification-time", usercontroller.fetchUserNotiTime);

module.exports = route;
