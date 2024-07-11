const route = require("express").Router();

const reporterRoutes = require("./reporter");
const cityRoutes = require("./city");
const countryRoutes = require("./country");

route.use("/reporters", reporterRoutes);
route.use("/cities", cityRoutes);
route.use("/countries", countryRoutes);

module.exports = route;
