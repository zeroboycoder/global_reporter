require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");
const telegram = require("../util/telegram");

exports.createSettings = async (req, res) => {
  const { payload, isActive } = req.body;
  const { name } = req.query;
  try {
    // Check if setting already exists
    const isSettingAlreadyExists = await prisma.setting.findUnique({
      where: {
        name,
      },
    });
    if (isSettingAlreadyExists) {
      // Update the payload
      await prisma.setting.update({
        where: {
          name,
        },
        data: {
          payload,
          isActive,
        },
      });
    } else {
      // Else setting does not exist
      await prisma.setting.create({
        data: {
          name,
          payload,
          isActive,
        },
      });
    }

    if (name === "system-maintenance") {
      let text = "";
      if (isActive === true) {
        text = "Maintenance mode enabled";
      } else {
        text = "Maintenance mode disabled";
      }
      await telegram.send("appNoti", text);
    }

    return response.success(res, `${name} updated successfully`);
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
