const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createSettings = async (req, res) => {
  const { name, payload } = req.body;
  try {
    const result = await prisma.setting.create({
      data: {
        name,
        payload,
      },
    });
    return response.success(res, `${name} created successfully`, result);
  } catch (error) {
    console.log(error);
    return response.error(res, `Error creating ${name}`, error.message);
  }
};

exports.getSetting = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await prisma.setting.findUnique({
      where: {
        name,
      },
    });
    return response.success(res, `${name} fetched successfully`, result);
  } catch (error) {
    return response.error(res, `Error fetching ${name}`, error.message);
  }
};
