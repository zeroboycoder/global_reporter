const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const response = require("../util/response");

exports.createReporter = async (req, res) => {
  try {
    const { fullName, password, categoryIds, countryId, isGlobal } = req.body;

    // Step 1. Generate the reporter loginId
    let loginId;
    const generateReporterLoginId = async () => {
      const alphabets = "abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < 4; i++) {
        loginId += alphabets[Math.floor(Math.random() * alphabets.length)];
      }
      loginId += Math.floor(Math.random() * 10);
      loginId += Math.floor(Math.random() * 10);
      const isAlreadyReporterLoginId = await prisma.reporter.findFirst({
        where: {
          loginId,
        },
      });
      isAlreadyReporterLoginId ? generateReporterLoginId() : null;
    };
    generateReporterLoginId();

    // Step 2. Generate the password
    let hashedPassword = await bcrypt.hash(password, 10);

    // Step 3. Create the reporter
    const reporter = await prisma.reporter.create({
      data: {
        loginId,
        photoUrl: "",
        fullName,
        password: hashedPassword,
        countryId: parseInt(countryId),
        isGlobal,
      },
    });

    // Create the reporter categories
    categoryIds.map(async (categoryId) => {
      await prisma.reporterCategories.create({
        data: {
          reporterId: reporter.id,
          categoryId,
        },
      });
    });

    return response.success(res, "Reporter created successfully");
  } catch (error) {
    return response.error(res, "Error creating reporter", error.message);
  }
};

exports.fetchReporter = async (req, res) => {
  try {
    const { loginId, name } = req.body;

    const reporter = await prisma.reporter.findFirst({
      where: {
        loginId,
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
    const { loginId } = req.params;

    const reporter = await prisma.reporter.update({
      where: {
        loginId,
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
    const { loginId } = req.params;
    let hashedPassword = await bcrypt.hash(password, 10);

    const reporter = await prisma.reporter.update({
      where: {
        loginId,
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
