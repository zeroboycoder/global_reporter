const route = require("express").Router();

const reporterRoutes = require("./reporter");
const cityRoutes = require("./city");
const countryRoutes = require("./country");
const adminRoute = require("./admin");
const authRoute = require("./auth");

route.use("/reporters", reporterRoutes);
route.use("/cities", cityRoutes);
route.use("/countries", countryRoutes);
route.use("/admins", adminRoute);
route.use("/auth", authRoute);

module.exports = route;
