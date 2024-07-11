const route = require("express").Router();
const countryController = require("../../controllers/countryController");

route.get("/", countryController.fetchCountry);

route.post("/", countryController.createCountry);

route.put("/:countryId", countryController.updateCountry);

route.delete("/:countryId", countryController.deleteCountry);

module.exports = route;
