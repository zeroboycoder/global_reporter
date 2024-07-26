const route = require("express").Router();
const { verifyToken } = require("../middlewares/jwt");

const authRoute = require("./auth");
const adminRoute = require("./admin");
const categoryRoute = require("./category");
const regionRoutes = require("./region");
const countryRoutes = require("./country");
const settingRoutes = require("./setting");
const versionRoutes = require("./version");
const reporterRoutes = require("./reporter");

route.use("/auth", authRoute);
route.use("/admins", verifyToken, adminRoute);
route.use("/categories", verifyToken, categoryRoute);
route.use("/regions", verifyToken, regionRoutes);
route.use("/countries", verifyToken, countryRoutes);
route.use("/settings", verifyToken, settingRoutes);
route.use("/versions", verifyToken, versionRoutes);
route.use("/reporters", verifyToken, reporterRoutes);

route.use("/health-check", (req, res) =>
  res.json({
    statusCode: 200,
    message: "API is working.",
  })
);

module.exports = route;
