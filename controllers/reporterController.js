const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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

    // Step 2. Create the reporter
    const reporter = await prisma.reporter.create({
      data: {
        reporterId,
        password,
        name,
        countryId,
        cityId,
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
    const { reporterId, name } = req.body;

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
  const {} = req.bbody;
};
