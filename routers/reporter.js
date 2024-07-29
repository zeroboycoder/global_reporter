const route = require("express").Router();
const reporterController = require("../controllers/reporterController");

route.get("/", reporterController.fetchReporters);

route.get("/:id", reporterController.fetchReporterDetail);

route.post("/", reporterController.createReporter);

route.put("/:id", reporterController.updateReporterByAdmin);

route.put(
  "/:id/update-password",
  reporterController.updateReporterPasswordByAdmin
);

module.exports = route;
