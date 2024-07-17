const route = require("express").Router();
const reporterController = require("../controllers/reporterController");

route.get("/", reporterController.fetchReporter);

route.post("/", reporterController.createReporter);

route.put("/:reporterId", reporterController.updateReporterByAdmin);

route.put(
  "/:reporterId/change-password",
  reporterController.updateReporterPasswordByAdmin
);

module.exports = route;
