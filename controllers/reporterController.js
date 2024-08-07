const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const response = require("../util/response");
const { fetchData } = require("../util/apiQuery");

exports.createReporter = async (req, res) => {
  try {
    const { fullName, password, categoryIds, countryId, isGlobal } = req.body;

    // Step 1. Generate the reporter loginId
    let loginId = "";
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
    let hashedPassword = await bcrypt.hash(password.toString(), 10);

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
    Promise.all(
      categoryIds.map(async (categoryId) => {
        await prisma.reporterCategories.create({
          data: {
            reporterId: reporter.id,
            categoryId,
          },
        });
      })
    );

    return response.success(res, "Reporter created successfully");
  } catch (error) {
    console.log(error);
    return response.error(res, "Error creating reporter", error.message);
  }
};

exports.fetchReporters = async (req, res) => {
  try {
    const {
      page = 1,
      showPerPage = 10,
      sort = "desc",
      name = undefined,
      id = undefined,
    } = req.query;

    // Config for filter
    const where = {};
    name ? (where.fullName = { startsWith: name }) : null;
    id ? (where.id = parseInt(id)) : null;

    const select = {
      id: true,
      fullName: true,
      country: {
        select: {
          name: true,
        },
      },
      reporter_info: true,
      isActive: true,
    };

    const reporters = await fetchData(
      res,
      "reporter",
      page,
      showPerPage,
      sort,
      where,
      null,
      select
    );

    return response.success(res, "Reporters fetched successfully", reporters);
  } catch (error) {
    return response.error(res, "Reporters fetched failed", error.message);
  }
};

exports.fetchReporterDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const reporter = await prisma.reporter.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        loginId: true,
        fullName: true,
        createdAt: true,
      },
    });

    return response.success(
      res,
      "Fetched reporter detail successfully",
      reporter
    );
  } catch (error) {
    return response.error(res, "Reporter detial fetched failed", error.message);
  }
};

exports.updateReporterByAdmin = async (req, res) => {
  try {
    const { fullName, categoryIds, countryId, isGlobal } = req.body;
    const { id } = req.params;

    const reporter = await prisma.reporter.update({
      where: {
        id,
      },
      data: {
        fullName,
        countryId,
        isGlobal,
      },
    });

    if (categoryIds?.length > 0) {
      // Create the reporter categories
      Promise.all(
        categoryIds.map(async (categoryId) => {
          await prisma.reporterCategories.create({
            data: {
              reporterId: id,
              categoryId,
            },
          });
        })
      );
    }

    delete reporter.password;
    return response.success(res, "Reporter updated successfully", reporter);
  } catch (error) {
    return response.error(res, "Reporter updating failed", error.message);
  }
};

exports.updateReporterPasswordByAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    let hashedPassword = await bcrypt.hash(password, 10);

    await prisma.reporter.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return response.success(res, "Reporter password updated successfully", {});
  } catch (error) {
    return response.error(
      res,
      "Reporter updating password failed",
      error.message
    );
  }
};
