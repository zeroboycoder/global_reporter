const route = require("express").Router();

const adminRoute = require("./admin");
const authRoute = require("./auth");
const categoryRoute = require("./category");
const reporterRoutes = require("./reporter");
const cityRoutes = require("./city");
const countryRoutes = require("./country");

route.use("/admins", adminRoute);
route.use("/auth", authRoute);
route.use("/categories", categoryRoute);
route.use("/reporters", reporterRoutes);
route.use("/cities", cityRoutes);
route.use("/countries", countryRoutes);

module.exports = route;
