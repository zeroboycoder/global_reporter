const route = require("express").Router();
const versionController = require("../controllers/versionController");

route.get("/", versionController.getVersionHistories);

route.get("/:versionId", versionController.getVersionDetail);

route.get("/current-version", versionController.getCurrentVersion);

route.post("/", versionController.createVersion);

route.put("/:versionId", versionController.updateVersion);

module.exports = route;
