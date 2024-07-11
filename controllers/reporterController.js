const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const response = require("../util/response");

exports.createReporter = async (req, res) => {
  try {
    const { name, password, categoryIds, countryId, cityId, isGlobalReporter } =
      req.body;

    // Step 1. Generate the reporterId
    let reporterId;
    const generateReporterId = async () => {
      const alphabets = "abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < 4; i++) {
        reporterId += alphabets[Math.floor(Math.random() * alphabets.length)];
      }
      reporterId += Math.floor(Math.random() * 10);
      reporterId += Math.floor(Math.random() * 10);
      const isAlreadyReportedId = await prisma.reporter.findFirst({
        where: {
          reporterId,
        },
      });
      isAlreadyReportedId ? generateReporterId() : null;
    };
    generateReporterId();

    // Step 2. Generate the password
    let hashedPassword = await bcrypt.hash(password, 10);

    // Step 3. Create the reporter
    const reporter = await prisma.reporter.create({
      data: {
        reporterId,
        password: hashedPassword,
        name,
        countryId: parseInt(countryId),
        cityId: parseInt(countryId),
        categoryIds,
        isGlobalReporter,
      },
    });
    return response.success(res, "Reporter created successfully", reporter);
  } catch (error) {
    return response.error(res, "Error creating reporter", error.message);
  }
};

exports.fetchReporter = async (req, res) => {
  try {
    const { reporterId, name } = req.query;

    const reporter = await prisma.reporter.findFirst({
      where: {
        reporterId,
        name,
      },
    });

    return response.success(res, "Reporter fetched successfully", reporter);
  } catch (error) {
    return response.error(error, "Reporter fetched failed", error.message);
  }
};

exports.updateReporterByAdmin = async (req, res) => {
  try {
    const { name, categoryIds, countryId, cityId, isGlobalReporter } = req.body;
    const { reporterId } = req.params;

    const reporter = await prisma.reporter.update({
      where: {
        reporterId,
      },
      data: {
        name,
        categoryIds,
        countryId,
        cityId,
        isGlobalReporter,
      },
    });
    return response.success(res, "Reporter updated successfully", reporter);
  } catch (error) {
    return response.error(error, "Reporter updating failed", error.message);
  }
};

exports.updateReporterPasswordByAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const { reporterId } = req.params;
    let hashedPassword = await bcrypt.hash(password, 10);

    const reporter = await prisma.reporter.update({
      where: {
        reporterId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return response.success(
      res,
      "Reporter password updated successfully",
      reporter
    );
  } catch (error) {
    return response.error(
      error,
      "Reporter updating password failed",
      error.message
    );
  }
};
