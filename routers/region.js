const route = require("express").Router();
const regionController = require("../controllers/regionController");

route.get("/", regionController.fetchRegion);

route.post("/", regionController.createRegion);

route.put("/:regionId", regionController.updateRegion);

route.delete("/:regionId", regionController.deleteRegion);

module.exports = route;
