const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createCity = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const city = await prisma.city.create({
      data: {
        name,
        countryId: parseInt(countryId),

        // country: {
        //   connect: {
        //     id: parseInt(countryId),
        //   },
        // },
      },
    });
    return response.success(res, "City created successfully", city);
  } catch (error) {
    return response.error(res, "Error creating city", error.message);
  }
};

exports.fetchCity = async (req, res) => {
  try {
    const { countryId } = req.body;
    const city = await prisma.city.findMany({
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
    return response.success(res, "City fetched successfully", city);
  } catch (error) {
    return response.error(res, "Error fetching city", error.message);
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const { name } = req.body;

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
    return response.error(res, "Error deleting cityId", error.message);
  }
};
