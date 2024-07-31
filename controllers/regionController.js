const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");
const { fetchData } = require("../util/apiQuery");

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
    const {
      page = 1,
      showPerPage = 10,
      sort = "desc",
      name = undefined,
      countryId,
    } = req.query;

    if (!countryId) {
      return response.error(res, "Country id is required");
    }

    const where = {
      name: {
        startsWith: name,
      },
      countryId: parseInt(countryId),
    };

    const include = {
      country: {
        select: {
          name: true,
        },
      },
    };

    const regions = await fetchData(
      res,
      "region",
      page,
      showPerPage,
      sort,
      where,
      include
    );

    return response.success(res, "Region fetched successfully", regions);
  } catch (error) {
    return response.error(res, "Error fetching region", error.message);
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const { regionId } = req.params;
    const { name, isActive } = req.body;

    const region = await prisma.region.update({
      where: {
        id: parseInt(regionId),
      },
      data: {
        name,
        isActive,
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
