const route = require("express").Router();

const adminRoute = require("./admin");
const authRoute = require("./auth");
const categoryRoute = require("./category");
const regionRoutes = require("./region");
const countryRoutes = require("./country");
const settingRoutes = require("./setting");
const versionRoutes = require("./version");
const reporterRoutes = require("./reporter");

route.use("/admins", adminRoute);
route.use("/auth", authRoute);
route.use("/categories", categoryRoute);
route.use("/regions", regionRoutes);
route.use("/countries", countryRoutes);
route.use("/settings", settingRoutes);
route.use("/versions", versionRoutes);
route.use("/reporters", reporterRoutes);

module.exports = route;
