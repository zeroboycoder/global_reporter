const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const country = await prisma.country.create({
      data: {
        name,
        photoUrl: "www.google.com",
      },
    });
    return response.success(res, "Country created successfully", country);
  } catch (error) {
    return response.error(res, error.message);
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
    const { name, photoUrl } = req.body;

    const country = await prisma.country.update({
      where: {
        id: parseInt(countryId),
      },
      data: {
        name,
        photoUrl,
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
