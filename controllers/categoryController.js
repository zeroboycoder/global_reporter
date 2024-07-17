const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createCategory = async (req, res) => {
  try {
    const { name, order } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        photoUrl: "www.google.com",
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
    const category = await prisma.category.findMany();
    return response.success(res, "Category fetched successfully", category);
  } catch (error) {
    return response.error(res, "Error fetching category", error.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: {
        id: parseInt(categoryId),
      },
      data: {
        name,
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
