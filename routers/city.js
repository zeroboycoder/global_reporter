const route = require("express").Router();
const cityController = require("../controllers/cityController");

route.get("/", cityController.fetchCity);

route.post("/", cityController.createCity);

route.put("/:cityId", cityController.updateCity);

route.delete("/:cityId", cityController.deleteCity);

module.exports = route;
