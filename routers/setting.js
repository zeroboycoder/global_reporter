const route = require("express").Router();
const settingController = require("../controllers/settingController");

route.post("/", settingController.createSettings);

route.get("/", settingController.getSetting);

module.exports = route;
