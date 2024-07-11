const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createCountry = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const country = await prisma.country.create({
      data: {
        name,
        imageUrl,
      },
    });
    return response.success(res, "Country created successfully", country);
  } catch (error) {
    return response.error(res, "Error creating country", error.message);
  }
};

exports.fetchCountry = async (req, res) => {
  try {
    const country = await prisma.country.findMany();
    return response.success(res, "Country fetched successfully", country);
  } catch (error) {
    return response.error(res, "Error fetching country", error.message);
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { countryId } = req.params;
    const { name, imageUrl } = req.body;

    const country = await prisma.country.update({
      where: {
        id: parseInt(countryId),
      },
      data: {
        name,
        imageUrl,
      },
    });

    return response.success(res, "Country updated successfully", country);
  } catch (error) {
    return response.error(res, "Error updating country", error.message);
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { countryId } = req.params;

    await prisma.country.delete({
      where: {
        id: parseInt(countryId),
      },
    });

    return response.success(res, "Country deleted successfully");
  } catch (error) {
    console.log(error);
    return response.error(res, "Error deleting country", error.message);
  }
};
