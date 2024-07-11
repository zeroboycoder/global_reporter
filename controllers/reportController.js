const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createReport = async (req, res) => {
  try {
    const { type, name, point } = req.body;
    let model;
    if (type === "news") {
      model = ReportNews;
    } else if (type === "comment") {
      model = ReportComment;
    }
    const result = await prisma.model.create({
      data: {
        name,
        point,
      },
    });
    return response.success(res, `${model} created successfully`, result);
  } catch (error) {
    return response.error(res, `Error creating ${model}`, error.message);
  }
};

exports.fetchCity = async (req, res) => {
  try {
    const { type } = req.query;
    let model;
    if (type === "news") {
      model = ReportNews;
    } else if (type === "comment") {
      model = ReportComment;
    }
    const result = await prisma.model.findMany({});
    return response.success(res, `${model} fetched successfully`, result);
  } catch (error) {
    return response.error(res, `Error fetching ${model}`, error.message);
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const { name } = req.body;

    let model;
    if (type === "news") {
      model = ReportNews;
    } else if (type === "comment") {
      model = ReportComment;
    }

    const city = await prisma.city.update({
      where: {
        id: parseInt(cityId),
      },
      data: {
        name,
      },
    });

    return response.success(res, "City updated successfully", city);
  } catch (error) {
    return response.error(res, "Error updating city", error.message);
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    await prisma.city.delete({
      where: {
        id: parseInt(cityId),
      },
    });

    return response.success(res, "City deleted successfully");
  } catch (error) {
    return response.error(res, "Error deleting city", error.message);
  }
};
