const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");
const { fetchData } = require("../util/apiQuery");

exports.createCategory = async (req, res) => {
  try {
    const { name, photoUrl, order } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        photoUrl,
        order: parseInt(order),
      },
    });
    return response.success(res, "Category created successfully", category);
  } catch (error) {
    return response.error(res, "Error creating category", error.message);
  }
};

exports.fetchCategory = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc", name } = req.query;

    const where = {
      name: {
        startsWith: name,
      },
    };

    const categories = await fetchData(
      res,
      "category",
      page,
      showPerPage,
      sort,
      where
    );

    return response.success(res, "Categories fetched successfully", categories);
  } catch (error) {
    return response.error(res, "Error fetching categories", error.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, isActive } = req.body;

    const category = await prisma.category.update({
      where: {
        id: parseInt(categoryId),
      },
      data: {
        name,
        isActive,
      },
    });

    return response.success(res, "Category updated successfully", category);
  } catch (error) {
    return response.error(res, "Error updating category", error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    await prisma.category.delete({
      where: {
        id: parseInt(categoryId),
      },
    });

    return response.success(res, "Category deleted successfully");
  } catch (error) {
    return response.error(res, "Error deleting category", error.message);
  }
};
