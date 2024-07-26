const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return response.success(res, "Users fetched successfully", users);
  } catch (error) {
    return response.error(res, "Error fetching users", error.message);
  }
};
