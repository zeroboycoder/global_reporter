const route = require("express").Router();
const settingController = require("../controllers/settingController");

route.post("/terms", settingController.createSettings);

route.post("/reporter-policy", settingController.createSettings);

route.post("/user-policy", settingController.createSettings);

route.post("/about-us", settingController.createSettings);

route.post("/maintenance", settingController.createSettings);

route.post("/report-time", settingController.createSettings);

route.get("/", settingController.getSetting);

module.exports = route;
