const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createRegion = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const region = await prisma.region.create({
      data: {
        name,
        countryId: parseInt(countryId),
      },
    });
    return response.success(res, "Region created successfully", region);
  } catch (error) {
    console.log(error);
    return response.error(res, "Error creating region", error.message);
  }
};

exports.fetchRegion = async (req, res) => {
  try {
    const { countryId } = req.query;
    console.log(countryId);
    const region = await prisma.region.findMany({
      where: {
        countryId: parseInt(countryId),
      },
      include: {
        country: {
          select: {
            name: true,
          },
        },
      },
    });
    return response.success(res, "Region fetched successfully", region);
  } catch (error) {
    return response.error(res, "Error fetching region", error.message);
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const { regionId } = req.params;
    const { name } = req.body;

    const region = await prisma.region.update({
      where: {
        id: parseInt(regionId),
      },
      data: {
        name,
      },
    });

    return response.success(res, "Region updated successfully", region);
  } catch (error) {
    return response.error(res, "Error updating region", error.message);
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const { regionId } = req.params;

    await prisma.region.delete({
      where: {
        id: parseInt(regionId),
      },
    });

    return response.success(res, "Region deleted successfully");
  } catch (error) {
    return response.error(res, "Error deleting region", error.message);
  }
};
